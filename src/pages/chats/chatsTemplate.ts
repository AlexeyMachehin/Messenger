export const chatsTemplate = `
aside.chats
    .chats-list__header !{generalLink} !{chatPageInput}

    ul.chats-list
        each item in chats
            li.chat__item !{item}
section.chat            
    .chat__header
        .chat-name !{avatarHeader}
            h3=userName
        .chat__header-container
            button.manage-user__button
            ul(class="select-list select-list-header")
                li.select-item(id="addUser")
                    .add-icon
                    p Add user
                li.select-item(id="DeleteUser")
                    .delete-icon
                    p Delete user
                li.select-item(id="DeleteChat")
                    .delete-icon
                    p Delete chat 
    .messages !{messagesList}
    .chat__footer 
        .chat__footer-container 
            button.manage-file__button
            ul(class="select-list select-list-footer")
                li.select-item
                    .photo-video-icon
                    p Photo or video
                li.select-item
                    .file-icon
                    p File
                li.select-item
                    .location-icon
                    p Location
        form.message-form !{inputFooter}
            button.message-form__button                           
`;
