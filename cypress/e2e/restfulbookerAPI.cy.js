
import data from '../fixtures/dataapi.json';

describe('Update Booking', () => {
    const updateHeaders = {
      'Content-Type': "application/json",
      'Accept': "application/json",
      'Cookie': data.cookie,
      'Authorization' : data.auth
    };
    const createData = {
      firstname: "New Julian",
      lastname: "Lostumbo",
      totalprice: 100,
      depositpaid: true,
      bookingdates: {
        checkin: "2025-06-01",
        checkout: "2025-06-07",
      },
      additionalneeds: "Breakfast"
    };
    const updateData = {
      firstname: "Julian Updated",
      lastname: "Lostumbo",
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: "2025-06-01",
        checkout: "2025-06-07",
      },
      additionalneeds: "Dinner"
    };

    it('UpdateBooking_RestfulBooker_001	-	Verify if a new booking record is correctly updated', () => {
        cy.request({
            method: 'POST', 
            url: data.url + '/booking',
            headers: {'Content-Type': "application/json"},
            body: createData
        }).then((response) => {
            cy.log('New booking:');
            cy.log(response);
            expect(response.status).to.eq(200);
            let bookingId = response.body.bookingid;
            cy.request({
                method: 'PUT', 
                url: data.url + '/booking/' + bookingId,
                headers: updateHeaders,
                body: updateData
            }).then((response) => {
                cy.log('Updated booking:');
                cy.log(response);
                expect(response.status).to.eq(200);
                expect(response.body.firstname).to.eq(updateData.firstname);
                expect(response.body.lastname).to.eq(updateData.lastname);
                expect(response.body.totalprice).to.eq(updateData.totalprice);
                expect(response.body.depositpaid).to.eq(updateData.depositpaid);
                expect(response.body.bookingdates.checkin).to.eq(updateData.bookingdates.checkin);
                expect(response.body.bookingdates.checkout).to.eq(updateData.bookingdates.checkout);
                expect(response.body.additionalneeds).to.eq(updateData.additionalneeds);
            });
        })
    })

    it('UpdateBooking_RestfulBooker_002	-	Verify if an existing record is correctly updated', () => {
        cy.request({
            method: 'PUT', 
            url: data.url + '/booking/1',
            headers: updateHeaders,
            body: updateData
        }).then((response) => {
            cy.log('Updated booking:');
            cy.log(response);
            expect(response.status).to.eq(200);
            expect(response.body.firstname).to.eq(updateData.firstname);
            expect(response.body.lastname).to.eq(updateData.lastname);
            expect(response.body.totalprice).to.eq(updateData.totalprice);
            expect(response.body.depositpaid).to.eq(updateData.depositpaid);
            expect(response.body.bookingdates.checkin).to.eq(updateData.bookingdates.checkin);
            expect(response.body.bookingdates.checkout).to.eq(updateData.bookingdates.checkout);
            expect(response.body.additionalneeds).to.eq(updateData.additionalneeds);
        });
    });

    it('UpdateBooking_RestfulBooker_003	-	Verify if a booking is able to be updated several times', () => {
        cy.request({
            method: 'PUT', 
            url: data.url + '/booking/1',
            headers: updateHeaders,
            body: updateData
        }).then((response) => {
            cy.log('First updated booking:');
            cy.log(response);
            expect(response.status).to.eq(200);
            cy.request({
                method: 'PUT', 
                url: data.url + '/booking/13',
                headers: updateHeaders,
                body: {
                    firstname: updateData.firstname,
                    lastname: updateData.lastname,
                    totalprice: updateData.totalprice * 1.5,
                    depositpaid: updateData.depositpaid,
                    bookingdates: {
                        checkin: updateData.bookingdates.checkin,
                        checkout: updateData.bookingdates.checkin
                    },
                    additionalneeds: "Wine"
                }
            }).then((responseUpdate) => {
                cy.log('Last updated booking:');
                cy.log(responseUpdate);
                expect(responseUpdate.status).to.eq(200);
                expect(responseUpdate.body.totalprice).to.eq(updateData.totalprice * 1.5);
                expect(responseUpdate.body.additionalneeds).to.eq("Wine");
            })
        });
    });

    it('UpdateBooking_RestfulBooker_004	-	Try to update a booking record using missing fields', () => {
        cy.request({
            method: 'PUT', 
            url: data.url + '/booking/13',
            headers: updateHeaders,
            body: {
                firstname: "Julian Updated",
                lastname: "Lostumbo",
                totalprice: 111
            },
            failOnStatusCode: false
        }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.statusText).to.eq('Bad Request');
        });
    });

    it('UpdateBooking_RestfulBooker_005	-	Try to update a booking record using invalid ID', () => {
        cy.request({
            method: 'PUT', 
            url: data.url + '/booking/invalidid',
            headers: updateHeaders,
            body: updateData,
            failOnStatusCode: false
        }).then((response) => {
        expect(response.status).to.eq(405);
        expect(response.statusText).to.eq('Method Not Allowed');
        });
    })

    it('UpdateBooking_RestfulBooker_006	-	Try to update a booking record with a missing ID', () => {
        cy.request({
            method: 'PUT', 
            url: data.url + '/booking/',
            headers: updateHeaders,
            body: updateData,
            failOnStatusCode: false
        }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.statusText).to.eq('Not Found');
        });
    })

    it('UpdateBooking_RestfulBooker_007	-	Try to update a booking record without sending the auth in the header', () => {
        cy.request({
            method: 'PUT', 
            url: data.url + '/booking/invalidid',
            headers: {
            'Content-Type': "application/json",
            'Accept': "application/json",
            'Cookie': "token=abc123",
            'Authorization' : "Basic abc"
            },
            body: updateData,
            failOnStatusCode: false
        }).then((response) => {
        expect(response.status).to.eq(403);
        expect(response.statusText).to.eq('Forbidden');
        });
    });

    it('UpdateBooking_RestfulBooker_008	-	Try to update a booking record with missing body', () => {
        cy.request({
            method: 'PUT', 
            url: data.url + '/booking/13',
            headers: updateHeaders,
            body: {},
            failOnStatusCode: false
        }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.statusText).to.eq('Bad Request');
        });
    });

    it('UpdateBooking_RestfulBooker_009	-	Try to update a booking record with invalid format fields', () => {
        cy.request({
            method: 'PUT', 
            url: data.url + '/booking/13',
            headers: updateHeaders,
            body: {
                firstname: 123,
                lastname: 123,
                totalprice: "price",
                depositpaid: "true",
                bookingdates: {
                    checkin: 20250601,
                    checkout: 20250607,
                },
                additionalneeds: 99
            },
            failOnStatusCode: false
        }).then((response) => {
        expect(response.status).to.eq(400);
        });
    });

    it('UpdateBooking_RestfulBooker_010	-	Try to update a booking record with invalid booking dates', () => {
        cy.request({
            method: 'PUT', 
            url: data.url + '/booking/13',
            headers: updateHeaders,
            body: {
                firstname: "Julian Updated",
                lastname: "Lostumbo",
                totalprice: 111,
                depositpaid: true,
                bookingdates: {
                    checkin: "2026-06-01",
                    checkout: "2023-06-07",
                },
                additionalneeds: "Dinner"
            },
            failOnStatusCode: false
        }).then((response) => {
        expect(response.status).to.eq(400);
        });
    });
})