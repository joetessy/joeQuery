$l(() =>{

  let count = 1;
  $l('.addItem').on('click', () => {
    const input = $l('.input').nodes[0].value;
    let newListItem =
      `<li class=${count}>
        ${input}
        <button onClick=removeItem('.${count}')>
          Complete
        </button>
      </li> `;
    count += 1;
    $l('.todos').append(newListItem);
    $l('.input').nodes[0].value = '';
  });

  $l('.clearAll').on('click', () => {
    $l('.todos').children().remove();
  });
});


const removeItem = (input) => {
  $(input).remove();
};
