<?php

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): // Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST, OPTIONS");
        header("Access-Control-Allow-Headers: content-type");
        exit;

    case ("POST"): // Send the email;
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json");

        // Payload is not sent to $_POST Variable, it is sent to php:input as a text
        $json = file_get_contents('php://input');
        // Parse the Payload from text format to Object
        $params = json_decode($json);

        if ($params) {
            $email = $params->email;
            $name = $params->name;
            $message = $params->message;

            $recipient = 'thomaswinkler88@googlemail.com';
            $subject = "Contact From <$email>";
            $message = "From: " . $name . "<br>" . $message;

            $headers   = array();
            $headers[] = 'MIME-Version: 1.0';
            $headers[] = 'Content-type: text/html; charset=utf-8';

            // Additional headers
            $headers[] = "From: noreply@mywebsite.com";

            if (mail($recipient, $subject, $message, implode("\r\n", $headers))) {
                echo json_encode(['status' => 'success', 'message' => 'Email sent successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['status' => 'error', 'message' => 'Failed to send email']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Invalid request payload']);
        }
        break;

    default: // Reject any non POST or OPTIONS requests.
        header("Access-Control-Allow-Origin: *");
        header("Allow: POST, OPTIONS", true, 405);
        exit;
}
