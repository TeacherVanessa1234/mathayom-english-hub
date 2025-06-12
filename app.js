async function loadVocab() {
  const subject = document.getElementById('subject').value;
  const week = parseInt(document.getElementById('week').value);
  const res = await fetch('vocab_data.json');
  const data = await res.json();
  const vocabList = document.getElementById('vocab-list');
  vocabList.innerHTML = '';
  const filtered = data.find(d => d.subject === subject && d.week === week);
  if (filtered && filtered.words.length) {
    filtered.words.forEach(word => {
      const li = document.createElement('li');
      li.innerHTML = word.english + ' - ' + word.thai +
        ' <button onclick="speak(\\'' + word.english + '\\')">🔊</button>';
      vocabList.appendChild(li);
    });
  } else {
    vocabList.innerHTML = '<li>No words found for this selection.</li>';
  }
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}
