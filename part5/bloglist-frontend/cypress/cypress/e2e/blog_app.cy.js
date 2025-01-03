describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Manos Minadakis',
      username: 'manos',
      password: 'password'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/signup`, user)
    cy.visit('')
  })
  
  it('Front page can be opened', function() {
    cy.contains('Blogs')
  })

  it('Login form can be opened', function() {
    cy.contains('Login').click()
  })

  it('Login form is shown', function() {
    cy.contains('Login').click()
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login',function() {
    it('Fails with wrong credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('manos')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.get('.error').contains('invalid username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'manos is logged in')
    })

    it('Succeeds with correct credentials', function () {
      cy.contains('Login').click()
      cy.get('#username').type('manos')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('manos is logged in')
    })  
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'manos', password: 'password' })
    })

    it('A new blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#blog-title').type('A blog created by cypress')
      cy.get('#blog-url').type('https://ablogcreatedbycypress.com')
      cy.get('#add-blog-button').click()
      cy.contains('Blog A blog created by cypress added successfully')
      cy.get('.blog-item').contains('A blog created by cypress')
    })

    it('A Blog can be liked', function() {
      const newBlog = {
        title: 'A blog created by cypress',
        url: 'https://ablogcreatedbycypress.com'
      }
      cy.createBlog(newBlog)
      cy.contains('View').click()
      cy.get('.blog-like-button').click()
      cy.contains('Blog "A blog created by cypress" liked')
    })

    it('A Blog can be deleted', function() {
      const newBlog = {
        title: 'A blog created by cypress',
        url: 'https://ablogcreatedbycypress.com'
      }
      cy.createBlog(newBlog)
      cy.contains('View').click()
      cy.contains('Remove').click()
      cy.contains('Blog A blog created by cypress removed successfully')
    })

    it('The Remove button is visible only to appropriate user', function() {
      const newBlog = {
        title: 'A blog created by cypress',
        url: 'https://ablogcreatedbycypress.com'
      }
      cy.createBlog(newBlog)
      cy.contains('View').click()
      const otherUser = {
        name: 'John Doe',
        username: 'john',
        password: 'password'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users/signup`, otherUser)
      cy.login(otherUser)
      cy.visit('')
      cy.contains('View').click()
      cy.get('html').should('not.contain', 'Remove')
    })

    it('Blogs are sorted by likes descending', function () {
      const newBlog1 = {
        title: 'Not liked blog',
        url: 'https://ablogcreatedbycypress.com',
        likes: 0
      }
      const newBlog2 = {
        ...newBlog1,
        title: 'Liked blog',
        likes: 2
      }
      const newBlog3 = {
        ...newBlog1,
        title: 'Most liked blog',
        likes: 5
      }
      cy.createBlog(newBlog1)
      cy.createBlog(newBlog2)
      cy.createBlog(newBlog3)
      cy.get('.blog-item').eq(0).should('contain', 'Most liked blog')
      cy.get('.blog-item').eq(1).should('contain', 'Liked blog')
      cy.get('.blog-item').eq(2).should('contain', 'Not liked blog')
    })

  })
})