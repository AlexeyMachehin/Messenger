export const chatsTemplate = `
aside.chats !{deleteUserDialog} !{addUserDialog} !{manageChatModal}
    .chats-list__header !{generalLink} !{chatPageInput}

    ul.chats-list
        each item in chats
            li.chat__item !{item}
section.chat            
    .chat__header
        .chat-name !{avatarHeader}
            h3=userName
        .chat__header-container !{manageUserButton} !{selectHeader}
    .messages !{messagesList}
    .chat__footer 
        .chat__footer-container !{manageFileButton} !{selectFooter}
        form.message-form !{inputFooter}
            button.message-form__button                           
`;
