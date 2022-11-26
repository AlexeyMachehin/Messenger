export const chatsTemplate = `
aside.chats !{deleteUserDialog} !{addUserDialog} !{manageChatModal}
    .chats-list__header !{generalLink} !{chatPageInput}

    ul.chats-list
        each item in chats
            li.chat__item !{item}
if getSelectedChat()
    section.chat            
        .chat__header
            .chat-name !{avatarHeader}
                h3=userName
            .chat__header-container !{manageUserButton} !{selectHeader}
        .messages !{messagesList}
        .chat__footer 
            .chat__footer-container !{manageFileButton} !{selectFooter}
            form.message-form !{inputFooter} !{messageButton}
else 
    .no-messages
        p.no-messages__content Select or create a chat to send a message 
`;
