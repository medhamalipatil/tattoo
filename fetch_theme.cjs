const fs = require('fs');
fetch('https://21st.dev/community/themes?preview=%2F%40byjuananguirao%2Fthemes%2Fmooncalendar-theme-1784252439566')
  .then(res => res.text())
  .then(text => {
    fs.writeFileSync('temp_out.txt', text);
    console.log('Saved to temp_out.txt');
  });
