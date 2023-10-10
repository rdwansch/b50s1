const projects = [];

document.getElementById('upload-image').addEventListener('change', e => {
  document.querySelector('.image__name').innerHTML = e.target.files[0].name;
});

function handleSubmit(e) {
  e.preventDefault();

  const technologies = ['node-checkbox', 'react-checkbox', 'nextjs-checkbox', 'typescript-checkbox'];
  const inputImage = e.target['upload-image'].files[0];

  if (!inputImage) {
    alert('Image is Null');
    return;
  }

  const imageURL = URL.createObjectURL(inputImage);

  const project = {
    projectName: e.target['project-name'].value,
    startDate: e.target['start-date'].value,
    endDate: e.target['end-date'].value,
    // time: new Date(new Date(e.target['end-date'].value) - new Date(e.target['start-date'].value)).getDate(),
    description: e.target['description'].value,
    technologies: technologies.map(tech => e.target[tech].checked && tech).filter(tech => tech),
    image: imageURL,
  };

  if (new Date(project.startDate) > new Date(project.endDate)) {
    alert('Duration cannot be minus');
    return;
  }

  for (const property in project) {
    if (project[property].length < 1) {
      alert(`Form must be filled, ${property} is null`);
      return;
    }
  }

  projects.push(project);

  renderHTML();
}

function renderHTML() {
  const html = projects.map(
    (project, idx) => /*html*/ `
    <div class="card">
      <img src="${project.image}" alt="project" class="project__image" />
      <div class="project__header">
        <a href="detail-project.html" target="_blank">
          <h3>${project.projectName}</h3>
          <p>duration: ${countTime(project.startDate, project.endDate)}</p>
        </a>
      </div>

      <div class="project__description">
        ${project.description}
      </div>

      <div class="project__icons">
        ${project.technologies
          .map(tech => `<img src="images/${tech}.png" alt="${tech}" title="${tech.split('-')[0]}" />`)
          .join('')}
      </div>

      <div class="project__action">
        <button>Edit</button>
        <button onClick="handleDelete(${idx})">Delete</button>
      </div>
    </div>`
  );

  const cardWrapper = document.querySelector('.card__wrapper');
  cardWrapper.innerHTML = html.join('');
}

function countTime(startDate, endDate) {
  const diff = new Date(endDate) - new Date(startDate);
  const months = new Date(diff).getMonth();
  const date = new Date(diff).getDate();
  const years = new Date(endDate).getFullYear() - new Date(startDate).getFullYear();

  return `${years > 0 ? years + ' years' : ''} ${months > 0 ? months + ' months' : ''} ${date} days`;
}

function handleDelete(idx) {
  projects.splice(idx, 1);
  renderHTML();
}
