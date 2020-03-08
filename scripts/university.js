const laboratoriesArray = [
    {
        name: 'Programare WEB',
        expanded: false,
        specificLaboratories: [
            {
                name: 'Laboratorul 2',
                expanded: false,
                assigments: [
                    {
                        name: 'Tema 1',
                        link: '../pages/university/programare_web/lab_2/tema_1/index.html'
                    },
                    {
                        name: 'Tema 2',
                        link: '../pages/university/programare_web/lab_2/tema_2/index.html'
                    }
                ]
            }
        ]
    }
]

const renderLaboratories = () => {
    $('.laboratories-elements').remove();
    $('.laboratories').after(createLaboratoriesElements());
    bindCaretClick();
}

const createLaboratoriesElements = () => {
    laboratiesElements = laboratoriesArray.map((laboratory) => {
        let caret = `<i class='fa fa-caret-${laboratory.expanded ? 'down' : 'right'} expand-caret'></i>`
        return `
        <h5 class="list-group-item-heading laboratory-title" name="${laboratory.name}">${caret + laboratory.name}</h5>
        <div class='specific-laboratories-container'>
        ${laboratory.expanded ? createSpecificLaboratoriesElements(laboratory) : ''}
        </div>
        `
    })
    return `<div class='laboratories-elements'>${laboratiesElements}</div>`;
}

const createSpecificLaboratoriesElements = (laboratory) => {
    specificLaboratiesElements = laboratory.specificLaboratories.map((specificLaboratory) => {
        let caret = `<i class='fa fa-caret-${specificLaboratory.expanded ? 'down' : 'right'} expand-caret'></i>`
        return `
        <h6 class="list-group-item-heading laboratory-number" primary-name="${laboratory.name}" specific-name="${specificLaboratory.name}">${caret + specificLaboratory.name}</h6>
        ${specificLaboratory.expanded ? createAssigmentsElements(specificLaboratory) : ''}
        `
    })
    return specificLaboratiesElements;
}

const createAssigmentsElements = (laboratory) => {
    assigmentsElements = laboratory.assigments.map((assigment) => {
        return `
        <div class='assignments-container'>
            <a href=${assigment.link}>
                <p class="list-group-item-text assignment-number"><i class="fa fa-hand-o-right" aria-hidden="true"></i> ${assigment.name}</p>
            </a>
        </div>`
    })
    return assigmentsElements.join('');
}

const bindCaretClick = () => {
    $('.expand-caret').click((e) => {
        let targetLaboratoryName = $(e.target).parent().attr('name'); 
        let targetLaboratory = laboratoriesArray.find((laboratory) => laboratory.name == targetLaboratoryName);
        if (!targetLaboratory) {
            primaryLaboratoryName = $(e.target).parent().attr('primary-name');
            specificLaboratoryName = $(e.target).parent().attr('specific-name');
            primaryLaboratory = laboratoriesArray.find((laboratory) => laboratory.name == primaryLaboratoryName);
            targetLaboratory = primaryLaboratory.specificLaboratories.find((specificLaboratory) => specificLaboratory.name == specificLaboratoryName);
        }
        expandLab(targetLaboratory);
        renderLaboratories();
    })
}
const expandLab = (laboratory) => {
    laboratory.expanded = !laboratory.expanded;
}
$(document).ready(() => {
    renderLaboratories();
})