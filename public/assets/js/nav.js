// const nav = document.querySelector('nav');
// const contentContainer = document.getElementById('content-container');

// nav.addEventListener('click', async e => {
//   if (e.target.tagName === 'A') {
//     // Check if the clicked element is an 'a' tag
//     e.preventDefault();

//     // parsing where to go
//     const target = e.target.href;
//     console.log(target);

//     // get content of target
//     const plainHTML = await fetch(target)
//       .then(res => res.text())
//       .catch(err => console.log('Err on fetch htmlContent', err));

//     const regex = /<div\s+id="content-container"[^>]*>[\s\S]*?<!-- LAST -->[\s\S]*?<\/div>/i;
//     const newContent = plainHTML.match(regex)[0];

//     // replace container with new div
//     contentContainer.innerHTML = newContent;

//     // change url
//     window.history.pushState({}, '', target);
//     console.log('JS Execute');
//   }
// });

// ???????????????????????????????????????????????????????????????????????????????
