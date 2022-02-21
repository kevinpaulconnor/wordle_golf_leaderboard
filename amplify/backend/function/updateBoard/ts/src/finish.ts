var axios = require('axios');

const triggerNantzBot = async (tournament, secrets) => {
    const introMessages = ['A tradition unlike any other.', 'Hello friends.', 'Hallo Freunde.', 'Hola amigos.', 
        'Nǐ hǎo péngyǒu.', 'marhaban ya aisdiqa.', 'Bonjour les amis.', 'Hailo mitron.', 'Hyālō bandhurā.', 
        'Halo teman teman.', 'Olá amigos.', "Privet druz'ya."];
    const winningMessages = ["What a comeback!", "Got it!", "Perfect fit!", "Perfect.", "Nice way to go out!",
        "He got it!", "There it is, a win for the ages!", "Unflappable!", "If you're gonna do it, do it right!",
        "There it is, as grand as it gets!", "Is it his time? Yes — at long last!",
        "Look who is on top in the world of golf!", "Look out!", "Golf has a new champion!",
        "That's a win for the family!","It's a perfect fit!", "The Bear has come out of hibernation!",
        "He's two putts from victory...only needs one!", "That's all he needed!", "There it is!",
        "One of the epic performances in the annals of the sport!", "And after so many years, once and for all!",
        "Y.E. Yes!", "Will it be his life changing moment? Yes it will!",
        "Many doubted we'd ever see it, but here it is. The return to glory!"];

    const leaders = tournament.leaders.join(', ');
    let message = '';
    if (tournament.lastDay) {
        if (tournament.leaders.length > 1) {
            message = `The ${tournament.name} is going to a playoff between ${leaders}`;
        } else {
            let randomMessage = winningMessages[Math.floor(Math.random() * winningMessages.length)];
            message = `${randomMessage} The ${tournament.name} has been won by ${leaders}`;
        }
    } else {
        let randomMessage = introMessages[Math.floor(Math.random() * introMessages.length)];
        if (tournament.leaders.length > 1) {
            message = `${randomMessage} The current leaders of ${tournament.name} are ${leaders}`;
        } else {
            message = `${randomMessage} The current leader of ${tournament.name} is ${leaders}`;
        }
    }
    message += ' https://wordlegolf.highpostsoftware.com';
    const data = {
        text: message,
        bot_id: secrets.BOT_ID
    }
    const resp = await axios.post('https://api.groupme.com/v3/bots/post',data);
}

const finishTasks = async (tournament, secrets) => {
    //rebuild front end
    await axios.post(secrets.WEBHOOK_URL, {});
    await triggerNantzBot(tournament, secrets);
;
}

export default finishTasks;