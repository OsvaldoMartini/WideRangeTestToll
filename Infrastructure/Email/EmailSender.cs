using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Application.Email
{
    public class EmailSender : IEmailSender
    {
        private readonly IConfiguration _config;
        public EmailSender(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendEmailAsync(string userEmail, string emailSubject, string msg)
        {

            var client = new SendGridClient("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");

            var message = new SendGridMessage
            {
                From = new EmailAddress("support@shifthunter.com", "ShiftHunter"),
                Subject = emailSubject,
                PlainTextContent = msg,
                HtmlContent = msg
            };
            message.AddTo(new EmailAddress(userEmail));
            message.SetClickTracking(false, false);

            await client.SendEmailAsync(message);
        }
    }
}