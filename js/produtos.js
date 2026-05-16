const produto = fetch('js/produtos.json')
    .then(response => response.json())
    .then(data => {
        // Process the fetched data
        //console.log(data);
        return data;
    })
    .catch(error => {
        console.error('Error fetching produtos:', error);
    });

export { produto };