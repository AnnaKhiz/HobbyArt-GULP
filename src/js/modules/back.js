export function backToPortfolio() {
  const backButton = document.getElementById('button-back');
  backButton.addEventListener('click', () => {
    location.href = 'https://anna-khizhniak.site/'
  })
}