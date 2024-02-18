async function sprintChallenge5() {
    // 👇 SETUP BELOW THIS LINE 👇
    const footer = document.querySelector('footer');
    const currentYear = new Date().getFullYear();
    footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY 2023`;
  
    const cardsContainer = document.querySelector('.cards');
    const infoContainer = document.querySelector('.info');
  
    // 👇 FUNCTIONS BELOW THIS LINE 👇
    function createLearnerCard(learner, mentorsData) {
      const card = document.createElement('div');
      const heading3 = document.createElement('h3');
      const contentContainer = document.createElement('div');
      const heading4 = document.createElement('h4');
      const mentorsList = document.createElement('ul');
      const toggleButton = document.createElement('div');
  
      card.classList.add('card');
      toggleButton.classList.add('closed');
  
      card.appendChild(heading3);
      card.appendChild(contentContainer);
      card.appendChild(heading4);
      card.appendChild(mentorsList);
      heading4.appendChild(toggleButton);
  
      heading3.textContent = learner.fullName;
      contentContainer.textContent = learner.email;
      infoContainer.textContent = 'No learner is selected';
      heading4.classList.add('closed')
      heading4.textContent = "Mentors"
    
  
       heading4.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleCard();
      });
  
      function toggleCard() {
        if (heading4.classList.contains('closed')) {
          openCard();
        } else {
          closeCard();
        }
      }
  
      function openCard() {
        infoContainer.textContent = `The selected learner is ${learner.fullName}`
        heading3.textContent = `${learner.fullName}, ID ${learner.id}`
        heading4.textContent = 'Mentors';
        heading4.classList.remove('closed');
        heading4.classList.add('open');
        card.classList.add('selected');
      }
  
      function closeCard() {
        infoContainer.textContent = `The selected learner is ${learner.fullName}`
        heading4.textContent = 'Mentors';
        heading4.classList.add('closed');
        heading4.classList.remove('open');
        card.classList.add('selected');
      }
  
      learner.mentors.forEach((mentorId) => {
        const mentor = mentorsData.find((mentor) => mentor.id === mentorId);
        if (mentor) {
          const mentorListItem = document.createElement('li');
          mentorListItem.textContent = `${mentor.firstName} ${mentor.lastName}`;
          mentorsList.appendChild(mentorListItem);
        }
      });
  
      card.addEventListener('click', () => {
        if (card.classList.contains('selected')) {
            unselectedCard()
        } else {
            selectedCard()
        }
      });

      function selectedCard() {
        cardsContainer.querySelectorAll('.card').forEach((card) => {
          card.classList.remove('selected', 'closed');
        });
        heading3.textContent = `${learner.fullName}, ID ${learner.id}`;
        infoContainer.textContent = `The selected learner is ${learner.fullName}`;
        card.classList.add('selected');
        
      }

      function unselectedCard() {
          infoContainer.textContent = 'No learner is selected';
          heading3.textContent = learner.fullName;
          card.classList.remove('selected');
      }
  
      return card;
    }
  
    
    try {
      const [learnersResponse, mentorsResponse] = await Promise.all([
        axios.get('/api/learners'),
        axios.get('/api/mentors'),
      ]);
  
      const learners = learnersResponse.data;
      const mentors = mentorsResponse.data;
  
      if (learners.length === 0) {
        infoContainer.textContent = 'No learner is selected';
        return;
      }
  
      
      learners.forEach((learner) => {
        const learnerCard = createLearnerCard(learner, mentors);
        cardsContainer.appendChild(learnerCard);
      });
    } catch (error) {
      
      infoContainer.textContent = 'Something went wrong';
      console.error('Error fetching data:', error.message);
    }
  }
  
  // ❗ DO NOT CHANGE THE CODE BELOW
  if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 };
  else sprintChallenge5();