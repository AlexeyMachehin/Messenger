export const chatPanelTemplate = `
if getSelectedChat()
    section.chat !{chatHeader}
        .messages !{messagesList} !{chatFooter}
else
    section.chat
        .no-messages
            p.no-messages__content Select or create a chat to send a message
`;
