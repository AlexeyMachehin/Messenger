export const chatPanelTemplate = `
if getSelectedChat()
    section.chat !{deleteUserDialog} !{addUserDialog} !{manageChatModal} !{chatHeader}
        .messages !{messagesList} 
        .chat-footer-wrapper !{chatFooter}
else
    section.chat
        .no-messages
            p.no-messages__content Select or create a chat to send a message
`;
