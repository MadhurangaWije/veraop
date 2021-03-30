package com.veraop.backend.api.service.onboard;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailServiceClientBuilder;
import com.amazonaws.services.simpleemail.model.*;
import com.veraop.backend.api.dto.OnboardRequestDataDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * A service class which will handle functionality related to email notifications
 */
@Service
public class EmailService {

    private Template template;

    private static final String EMAIL_TEXT_TEMPLATE = "Dear %s,\n" +
            "\n" +
            "We are all really excited to welcome you to our team! As agreed, your start date is %s, " +
            "We expect you to be in our offices by %s and our dress code is casual.\n" +
            "\n" +
            "\n" +
            "At %s, we care about giving our employees everything they need to perform their best. As you will soon see, " +
            "we have prepared your workstation with all necessary equipment. Our team will help you setup your computer, " +
            "software and online accounts on your first day. \n" +
            "\n" +
            "We’ve planned your first days to help you settle in properly. You can find more details in the enclosed agenda. " +
            "As you will see, you’ll have plenty of time to read and complete your employment paperwork " +
            "(HR will be there to help you during this process!) " +
            "You will also meet with your hiring manager to discuss your first steps. " +
            "For your first week, we have also planned a few training sessions to give you a better understanding " +
            "of our company and operations.\n" +
            "\n" +
            "Our team is excited to meet you and look forward to introducing themselves to you during lunchtime.\n" +
            "\n" +
            "If you have any questions prior to your arrival, " +
            "please feel free to email or call me and I’ll be more than happy to help you.\n" +
            "\n" +
            "We are looking forward to working with you and seeing you achieve great things!\n" +
            "\n" +
            "Best regards,\n" +
            "\n" +
            "%s\n";

    @Value("${onboard.email.sender.address}")
    private String senderMailAddress;

    @Value("${company.name}")
    private String companyName;

    @Value("${onboard.email.sender.name}")
    private String senderName;

    @PostConstruct
    private void postProcess() {
        template = new Template();
        template.setTemplateName("OnboardInvitation");
        template.setSubjectPart("Welcome Onboard {{name}}!");
        template.setHtmlPart("<h1>Welcome to the place {{name}}</h1>");
        template.setTextPart("Sample text part");
    }

    /**
     * Sends the onboard welcome email to the given user.
     *
     * @param requestData data from onboard API request
     */
    public void sendEmail(OnboardRequestDataDTO requestData) {
        String formattedDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        AmazonSimpleEmailService emailClient = AmazonSimpleEmailServiceClientBuilder.standard()
               .withRegion(Regions.US_EAST_1)
                .build();

        Destination destination = new Destination(List.of(requestData.getEmailAddress()));

        Message mailMessage = new Message(new Content(String.format("Welcome to %s", companyName)),
                new Body(new Content(String.format(EMAIL_TEXT_TEMPLATE, requestData.getFirstName(), formattedDate,
                        "8:00 AM", companyName, senderName))));

        SendEmailRequest sendEmailRequest = new SendEmailRequest(senderMailAddress, destination, mailMessage);

        SendEmailResult sendEmailResult = emailClient.sendEmail(sendEmailRequest);
    }
}
