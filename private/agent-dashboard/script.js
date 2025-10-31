addEventListener('load', () => {
    document.getElementById('logout').addEventListener('click', () => {
        fetch('/api/sessions', {method: 'DELETE'})
            .then(response => {
                // Response status is 400 when there was no session to delete
                if (response.status !== 200 && response.status !== 400) {
                    console.log('Non-200 response status from logout', response.status)
                    return
                }
                location.href = '/'
            })
    })
})