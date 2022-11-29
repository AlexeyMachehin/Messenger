export const chatTemplate = `
div !{avatar}
.user__content
    .user__header
        h4=name 
        p.message-time=time  
    .user__main
        p.message-text=message
        if count>0
            span.message-count=count
`;
