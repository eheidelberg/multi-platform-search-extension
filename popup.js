const searchLinkedinButton = document.getElementById('searchLinkedin');
const searchGithubButton = document.getElementById('searchGithub');
const searchMobyGamesButton = document.getElementById('searchMobyGames');
const searchArtStationButton = document.getElementById('searchArtStation');

searchLinkedinButton.addEventListener('click', () => searchSelectedText('Linkedin'));
searchGithubButton.addEventListener('click', () => searchSelectedText('Github'));
searchMobyGamesButton.addEventListener('click', () => searchSelectedText('mobyGames'));
searchArtStationButton.addEventListener('click', () => searchSelectedText('artStation'));
searchWorkableButton.addEventListener('click', () => searchSelectedText('workable'));
searchHelloTalentButton.addEventListener('click', () => searchSelectedText('helloTalent'));

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
          	url = `https://github.com/search?type=Users&q=${encodeURIComponent(results[0].result)}`;
          	break;
          case 'mobyGames':
            url = `https://www.mobygames.com/search/quick?q=${selection}`;
            break;
          case 'artStation':
            url = `https://www.artstation.com/search/artists?sort_by=followers&query=${selection}`;
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
