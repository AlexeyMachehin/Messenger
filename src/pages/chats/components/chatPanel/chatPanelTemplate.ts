export const chatPanelTemplate = `
if getSelectedChat()
    section.chat !{deleteUserDialog} !{addUserDialog} !{manageChatModal}           
        .chat__header
            .chat-name !{avatarHeader}
                h3=userName
            .chat__header-container !{manageUserButton} !{selectHeader}
        .messages !{messagesList}
        .chat__footer 
            .chat__footer-container !{manageFileButton} !{selectFooter}
            form.message-form !{inputFooter} !{messageButton}
else
    section.chat
        .no-messages
            p.no-messages__content Select or create a chat to send a message
`;
