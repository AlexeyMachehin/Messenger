export const generalInputTemplate = `
div #[label=label] !{input}
if isValid
    span(class="error-span hidden")=errorText
else 
    span.error-span=errorText
`
