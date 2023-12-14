export function backToPortfolio() {
  const backButton = document.getElementById('button-back');
  backButton.addEventListener('click', () => {
    location.replace('https://anna-khizhniak.site/')

  })
}