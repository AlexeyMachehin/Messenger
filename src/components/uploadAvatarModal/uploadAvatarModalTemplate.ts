export const uploadAvatarModalTemplate =`
.card
    .close-button-container
        button.close-modal-button
    h3 Upload a file
    label.uploadAvatarModal__label Select a file on your computer 
        input(type="file" style="display: none" name="avatar")
    #{generalButtonChange}
`
