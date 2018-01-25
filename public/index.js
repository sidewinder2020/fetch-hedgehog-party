const getHedgehogs = () => {
  $('#hedgehog-info').html('');
  return fetch(`https://hedgehog-party.herokuapp.com/api/v1/invites`)
    .then((response) => handleResponse(response))
    .then((hedgies) => getEachHedgeHog(hedgies))
    .catch((error) => console.log({ error }));
};

const addNewHedgehog = (hedgyName,hedgyHoglets,hedgyAllergies) => {
  var newHedgy = {name: hedgyName, hoglets: hedgyHoglets, allergies: hedgyAllergies}
  return fetch(`https://hedgehog-party.herokuapp.com/api/v1/invites`, {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newHedgy),
  }).then((response) => handleResponse(response))
    .then((hedgy) => renderNewlyAddedHedgy(hedgy,newHedgy))
    .catch((error) => console.log({ error }));
};

const handleResponse = (response) => {
  return response.json()
    .then(json => {
      if (!response.ok) {
        const error = {
          status: response.status,
          statusText: response.statusText,
          ...json,
        };
        return Promise.reject(error);
      }
      return json
    })
}


const getEachHedgeHog = (hedgies) => {
  return hedgies.forEach((hedgy) => {
    renderHH(hedgy);
  })
}

const renderHH = (hedgy) => {
  $('#hedgehog-info').append(`
    <article class="invited-hedgehog">
      <p class="name">${hedgy.name}</p>
      <p class="hoglet-number">${hedgy.hoglets}</p>
      <p class="allergies">${hedgy.allergies}</p>
      <button id="${hedgy.id}" class="uninvite-btn" aria-label="Uninvite">
        uninvite
      </button>
    </article>
    `)
}

const renderNewlyAddedHedgy = (hedgy,newHedgy) => {
  $('#hedgehog-info').append(`
    <article class="invited-hedgehog">
      <p class="name">${newHedgy.name}</p>
      <p class="hoglet-number">${newHedgy.hoglets}</p>
      <p class="allergies">${newHedgy.allergies}</p>
      <button id="${hedgy.id}" class="uninvite-btn" aria-label="Uninvite">
        uninvite
      </button>
    </article>
    `)
}

const unInviteHedgehog = () => {

};

const clearForm = () => {
  $('#name').val("New Hedgehog Please");
  $('#hoglets').val("");
  $('#allergies').val("will your hedgehog die from anything?");
};



$(document).ready(() => {
  getHedgehogs();

  $('#invite-btn').on('click', function(event) {
    event.preventDefault();
    var hedgyName = $('#name').val();
    var hedgyHoglets = $('#hoglets').val();
    var hedgyAllergies = $('#allergies').val();
    addNewHedgehog(hedgyName,hedgyHoglets,hedgyAllergies);
    clearForm();
  });

});


$('#invited-hedgehogs-info').on('click', '.uninvite-btn', unInviteHedgehog);

//URL: https://hedgehog-party.herokuapp.com/api/v1/invites
