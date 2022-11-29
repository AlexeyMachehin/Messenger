export const messagesListTemplate = `
.messages-list__time
    h4=timeHeader
ul.messages-list
    each message in messages   
        li.messages-item !{message}          
`
