<?php
// Receive form data
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';
$recipient = "danielcheng1022@gmail.com"; // Change to your actual email

// Validate data
$errors = [];
if (empty($name)) {
    $errors[] = "Name cannot be empty";
}
if (empty($email)) {
    $errors[] = "Email cannot be empty";
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Please provide a valid email address";
}
if (empty($message)) {
    $errors[] = "Message cannot be empty";
}

// If no errors, send email
if (empty($errors)) {
    $subject = "Website Contact Form: Message from $name";
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";
    
    $headers = "From: $name <$email>";
    
    // Send email
    if (mail($recipient, $subject, $email_content, $headers)) {
        $success = true;
    } else {
        $errors[] = "Error sending email, please try again later";
    }
}

// Return result as JSON
header('Content-Type: application/json');
if (!empty($errors)) {
    echo json_encode(['success' => false, 'errors' => $errors]);
} else {
    echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully! We will get back to you soon.']);
}
?>