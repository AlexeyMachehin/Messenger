export const asidePanelTemplate = `
.chats-list__header 
    .general-link-container !{generalLink} 
    .chat-page-input-container !{searchChat} 
    form.create-chat-form !{createChatInput} !{createChatButton}
ul.chats-list
    each item in chats
        li.chat__item !{item}
`;
