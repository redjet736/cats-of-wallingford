function initMap() {
  // Create the map.
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: {lat: 47.672640, lng: -122.333800}
  });

  // Load the stores GeoJSON onto the map.
  map.data.loadGeoJson('stores.json', {idPropertyName: 'storeid'});

  const infoWindow = new google.maps.InfoWindow();

  // Show the information for a store when its marker is clicked.
  map.data.addListener('click', (event) => {
    const code_name = event.feature.getProperty('code_name');
    const real_name = event.feature.getProperty('real_name');
    const description = event.feature.getProperty('description');
    const friendliness = event.feature.getProperty('friendliness');
    const rarity = event.feature.getProperty('rarity');
    const position = event.feature.getGeometry().get();
    const content = `
      <h2>${code_name}</h2><p>${description}</p>
      <p><b>Real Name:</b> ${real_name}<br/><b>Friendliness:</b> ${friendliness}<br/><b>Rarity:</b> ${rarity}</p>
      <p><img src="tux.png" width="200px"</p>
    `;

    infoWindow.setContent(content);
    infoWindow.setPosition(position);
    infoWindow.setOptions({pixelOffset: new google.maps.Size(0, -30)});
    infoWindow.open(map);
  });
}
