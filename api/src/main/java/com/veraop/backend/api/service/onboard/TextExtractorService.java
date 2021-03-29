package com.veraop.backend.api.service.onboard;

import com.veraop.backend.api.model.BankDetailDTO;
import com.veraop.backend.api.model.OnboardRequestDataDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.SdkBytes;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.textract.TextractClient;
import software.amazon.awssdk.services.textract.model.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class TextExtractorService {

    public static final String ACCOUNT_NO_REGEX = "^\\d{3}-\\d{1}-\\d{3}-\\d{1}-\\d{7}$";
    public static final String BRANCH_REGEX = "^\\d{5}\\s+\\w+$";
    public static final String BANK_NAME_REGEX = "(?i)((PEOPLES)|(PEOPLE'S)|(Yes Account))";
    public static final String PEOPLE_BANK_REGEX = "(?i)((PEOPLES)|(PEOPLE'S)|(yes account))";

    public Map<String, String> getRelationships(Map<String, Block> blockMap, Map<String, Block> keyMap, Map<String, Block> valueMap) {

        Map<String, String> result = new LinkedHashMap<>();

        for (Map.Entry<String, Block> entry : keyMap.entrySet()) {

            Block valueBlock = findValue(entry.getValue(), valueMap);
            String key = getText(entry.getValue(), blockMap);
            String value = getText(valueBlock, blockMap);
            result.put(key, value);
        }

        return result;
    }

    public String getText(Block result, Map<String, Block> blockMap) {
        StringBuilder stringBuilder = new StringBuilder();
        for (Relationship relationship : result.relationships()) {

            if (relationship.type() == RelationshipType.CHILD) {

                for (String id : relationship.ids()) {
                    Block b = blockMap.get(id);
                    if (b.blockType() == BlockType.WORD) {
                        stringBuilder.append(b.text()).append(" ");
                    }
                }
            }
        }

        return stringBuilder.toString();
    }

    public Block findValue(Block keyBlock, Map<String, Block> valueMap) {
        Block block = null;
        for (Relationship relationship : keyBlock.relationships()) {
            if (relationship.type() == RelationshipType.VALUE) {
                for (String id : relationship.ids()) {
                    block = valueMap.get(id);
                }
            }
        }

        return block;
    }

    public Map<String, String> extractFormData(OnboardRequestDataDTO request) throws IOException {

        List<Block> blocks = getBlocks(request.getBankDetailImage());

        Map<String, Block> blockMap = new LinkedHashMap<>();
        Map<String, Block> keyMap = new LinkedHashMap<>();
        Map<String, Block> valueMap = new LinkedHashMap<>();

        for (Block block : blocks) {
            String blockId = block.id();
            blockMap.put(blockId, block);

            if (block.blockType() == BlockType.KEY_VALUE_SET) {

                for (EntityType entityType : block.entityTypes()) {

                    if (entityType == EntityType.KEY) {
                        keyMap.put(blockId, block);
                    } else {
                        valueMap.put(blockId, block);
                    }
                }
            }
        }

        return getRelationships(blockMap, keyMap, valueMap);
    }

    private List<Block> getBlocks(MultipartFile request) throws IOException {
        SdkBytes bytes = SdkBytes.fromInputStream(request.getInputStream());
        Document doc = Document.builder().bytes(bytes).build();

        List<FeatureType> featureList = new ArrayList<>();
        featureList.add(FeatureType.FORMS);

        AnalyzeDocumentRequest analyzeRequest = AnalyzeDocumentRequest
                .builder()
                .featureTypes(featureList)
                .document(doc)
                .build();

        TextractClient textractClient = TextractClient.builder()
                .region(Region.US_EAST_2)
                .build();

        AnalyzeDocumentResponse response = textractClient.analyzeDocument(analyzeRequest);

        textractClient.close();

        return response.blocks();
    }

    public BankDetailDTO identifyBankDetails(MultipartFile image) throws IOException {

        BankDetailDTO bankDetail = new BankDetailDTO();

        getBlocks(image).stream()
                .filter(b -> b.blockType() == BlockType.LINE)
                .forEach(block -> {

                    if (block.text().matches(ACCOUNT_NO_REGEX))
                        bankDetail.setAccountNo(block.text());

                    else if (block.text().matches(BRANCH_REGEX)) {
                        String normalizedText = block.text().trim().replaceAll("\\s{2,}", " ");

                        bankDetail.setBranchCode(normalizedText.split(" ")[0]);
                        bankDetail.setBranch(normalizedText.split(" ")[1]);
                    }

                    else if (block.text().matches(BANK_NAME_REGEX))
                        bankDetail.setBank(detectBankName(block.text()));
                });

        return bankDetail;
    }

    private String detectBankName(String bankInfo) {

        if (bankInfo.matches(PEOPLE_BANK_REGEX))
            return "PEOPLE'S BANK";

        else
            return "UNKNOWN";
    }
}
