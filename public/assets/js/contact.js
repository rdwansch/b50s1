function handleSubmit(e) {
  e.preventDefault();

  const data = {
    name: e.target.name.value,
    email: e.target.email.value,
    phoneNumber: e.target['phone-number'].value,
    subject: e.target.subject.value,
    message: e.target.message.value,
  };

  for (const property in data) {
    if (data[property] == '') {
      alert(`Form must be filled, ${property} is null `);
      return;
    }
  }

  const a = document.createElement('a');
  a.href = `https://mail.google.com/mail/?view=cm&fs=1&to=ridwanrasyid345@gmail.com&su=${data.subject}&body=Halo, nama saya ${data.name}.${data.message} .Tolong kontak saya pada email ${data.email} atau melalui telepon ${data.phoneNumber}`;
  a.target = '_blank';

  a.click();
}
