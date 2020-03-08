const bindProfileImageChange = () => {
    let targetImage = {};

    $('.active-project-card-image').mouseover((e) => {
        targetImage['name'] = e.target.id;
        targetImage['element'] = $(`#${e.target.id}`);
        targetImage.element.attr('src', `images/${targetImage.name}-hover.png`);
        $(targetImage.element.parent().parent()).css('backgroundColor', 'black')
    })
    
    $('.project-card-image').mouseout(() => {
        targetImage.element.attr('src', `images/${targetImage.name}.png`);
        $(targetImage.element.parent().parent()).css('backgroundColor', 'white')
    })
}

$(document).ready(() => {
    bindProfileImageChange();
})