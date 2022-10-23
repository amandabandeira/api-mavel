describe('POST /characters', function () {
    before(function () {
        cy.setToken()
        cy.back2ThePast()
    })
    it('deve cadastrar um personagem', function () {
        const character = {
            name: "Teste",
            alias: "Teste01",
            team: ["Vingadora"],
            active: true
        }
        cy.api({
            method: 'POST',
            url: '/characters',
            body: character,
            headers: {
                Authorization: Cypress.env('token')
            }
        }).then(function (response) { //calback da função de retorno  
            expect(response.status).to.eql(201)
            expect(response.body.character_id.length).to.eql(24)
        })
    })

    context.only('quando o personagem ja existe', function () {
        const character = {
            name: "Teste",
            alias: "Teste01",
            team: ["Vingadora"],
            active: true
        }
        before(function () {
            cy.api({
                method: 'POST',
                url: '/characters',
                body: character,
                headers: {
                    Authorization: Cypress.env('token')
                }
            }).then(function (response) { //calback da função de retorno  
                expect(response.status).to.eql(201)

            })
        })
        it('não deve cadastrar duplicado', function () {
            cy.api({
                method: 'POST',
                url: '/characters',
                body: character,
                failOnStatusCode: false,
                headers: {
                    Authorization: Cypress.env('token')
                }
            }).then(function (response) { //calback da função de retorno  
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Duplicate character')
            })
        })
    })
})

