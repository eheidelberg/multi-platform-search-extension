const searchLinkedinButton = document.getElementById('searchLinkedin');
const searchGithubButton = document.getElementById('searchGithub');
const searchMobyGamesButton = document.getElementById('searchMobyGames');
const searchArtStationButton = document.getElementById('searchArtStation');
const searchGoogleButton = document.getElementById('searchGoogle');
const searchBehanceButton = document.getElementById('searchBehance');

searchLinkedinButton.addEventListener('click', () => searchSelectedText('Linkedin'));
searchGithubButton.addEventListener('click', () => searchSelectedText('Github'));
searchMobyGamesButton.addEventListener('click', () => searchSelectedText('mobyGames'));
searchArtStationButton.addEventListener('click', () => searchSelectedText('artStation'));
searchGoogleButton.addEventListener('click', () => searchSelectedText('Google'));
searchBehanceButton.addEventListener('click', () => searchSelectedText('Behance'));


function searchSelectedText(platform) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: getSelectionText
    }, (results) => {
      if (results && results.length > 0 && results[0].result) {
        let url;
        const selection = encodeURIComponent(results[0].result);

        switch (platform) {
          case 'Linkedin':
 		    url = `https://www.linkedin.com/search/results/people/?keywords=${selection}`;
  			break;
          case 'Github':
          	url = `https://github.com/search?type=Users&q=${selection}`;
          	break;
          case 'mobyGames':
            url = `https://www.mobygames.com/search/quick?q=${selection}`;
            break;
          case 'artStation':
            url = `https://www.artstation.com/search/artists?sort_by=followers&query=${selection}`;
            break;
          case 'Google':
            url = `https://www.google.com/search?q="${selection}"+(Add any Boolean you want!)`;
            break;
          case 'Behance':
            url = `https://www.behance.net/search/users?search="${selection}"`;
            break;
        }

        chrome.tabs.create({ url });
      } else {
        alert('No text selected. Please select some text to search on the corresponding platform.');
      }
    });
  });
}

function getSelectionText() {
  return window.getSelection().toString();
}
