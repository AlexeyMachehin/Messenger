export const chatPanelTemplate = `
if getSelectedChat()
    section.chat !{deleteUserDialog} !{addUserDialog} !{manageChatModal} !{chatHeader}
        .messages !{messagesList}
        .chat__footer 
            .chat__footer-container !{manageFileButton} !{selectFooter}
            form.message-form !{inputFooter} !{messageButton}
else
    section.chat
        .no-messages
            p.no-messages__content Select or create a chat to send a message
`;
