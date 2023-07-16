csvLoad = config => {
    let applyTemplate = eval(`(${config.cols})=>\`${config.template}\``)
    let handleRow = row => config.target.innerHTML+= applyTemplate(...row.split(";"))
    fetch(config.file)
        .then(response => response.text())
        .then(data => data.split("\n").forEach(handleRow))
}
