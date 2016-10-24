<?php
// check if fields passed are empty
if (empty($_POST['name'])  		||
    empty($_POST['email']) 		||
    empty($_POST['message']) 	||
    !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
{
   echo 'Error: One or more field(s) is incomplete. <a href=\"javascript:history.go(-1)\">Click here</a> to go back.';
   return false;
}
	
$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];
	
// create email body and send it
$to = 'contact@polyappdev.club'; // put your email
$email_subject = "Contact form submitted by: $name";
$email_body = "You have received a new message.\n\n".
				      "Here are the details:\n\nName: $name\n".
				      "Email: $email_address\nMessage:\n$message";
$headers = "From: noreply@polyappdev.club\n";
$headers .= "Reply-To: $email_address";

if (mail($to,$email_subject,$email_body,$headers) && mail($email_address,"Form Submission: Cal Poly App Dev Club",
         "Thank you for your submission! We will get back to you ASAP.\n\nYou sent:\n$message",$headers))
{ 
   echo 'Thank you for your submission. Please <a href="../index.html">Click here</a> to return to our homepage.';
} 
else
{
   echo 'Error: Please try again later or contact us at <a href="mailto:calpolyappdev@gmail.com">calpolyappdev@gmail.com</a>.';
}

//mail($to,$email_subject,$email_body,$headers);
//return true;
?>
