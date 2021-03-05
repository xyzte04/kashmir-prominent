import React, { useState } from "react";
import ReactDOM from "react-dom";
import Person from "./components/Person";
import PersonTicker from "./components/PersonTicker";
import Timeline from "./components/Timeline";
import BackgroundAudio from "./components/BackgroundAudio";
import Head from "./components/Head";
import EndHashtags from "./components/EndHashtags";
import Footer from "./components/Footer";
import Toggle from "./components/Toggle";

import { Scrollama, Step } from "react-scrollama";

import "./index.scss";

import { select, timeParse } from "d3";

require("intersection-observer");

var tp = timeParse("%b %d, %Y");

// eslint-disable no-unused-vars

window.activeAudio = null;
window.muted = true;
window.activePerson = null;
window.selectedLanguage = "english";

var persons = [
  {
    name: "Tika Lal Taploo",
    dateStr: "Sept 14, 1989",
    image: "images/tika-lal-taploo.png",
    district: "srinagar",
    englishAudioFile: "media/Tika lal taploo English.m4a",
    urduAudioFile: "media/Tika Lal Taploo Urdu.m4a",
    content: `Tika Lal Taploo was a social worker, a politician and a lawyer. He joined the Kashmir Bar in 1957, and since then had been working as an active Participant in Promotion of Justice. Though a Kashmiri Pandit, Taploo was equally loved and respected by both Hindus and Muslims of J&K. He was an ardent champion of liberty and upholder of fundamental rights of the citizens. Whatever he earned as a lawyer, he spent on the needy widows helping them with their monthly rations, paying for school fees of their children, and paying for marriage of a number of Muslim girls. Most of his actions aptly reflected his pet name “Lala” (elder brother). He always rose above the base human weakness of cast, creed & religion. This is alas also the key reason for his death. His protests against terrorism carried weight with the masses. This, the terrorists could not afford. On 14 September, 1989 Taploo was attacked at his residence, but he came out openly and challenged the militants without any fear. Taploo was felled by the assassin bullets in broad-daylight outside his own house in Srinagar.`,
  },
  {
    name: "Justice Nilkanth Ganjoo",
    dateStr: "Nov 4, 1989",
    image: "images/ganjoo.png",
    district: "srinagar",
    englishAudioFile: "media/Ganjoo English.m4a",
    urduAudioFile: "media/Ganjoo Urdu.m4a",
    content: `Neelkanth Ganjoo was a high court judge in Kashmir. In the late 1960s, as a sessions court judge, he had presided over the trial of JKLF founder Maqbool Bhat in the murder of police inspector Amar Chand in 1966. In August 1968, he sentenced Bhat and one other to death.This sentence was upheld by the Supreme Court in 1982.

      In 1984, after JKLF cadres in Britain murdered diplomat Ravindra Mhatre, Bhat's execution was carried out in Tihar jail. The same year, some militants bombed Ganjoo's house.
      
      On 4 November 1989, a group of three people surrounded Ganjoo as he was in the Hari Singh Street market and shot him dead near the High Court in Srinagar as he was heading homewards after flying from Delhi.
      
      Ganjoo was among the early Kashmiri Pandits killed by terrorists in Kashmir.`,
  },
  {
    name: "Lassa Kaul",
    dateStr: "Feb 13, 1990",
    image: "images/lassa-kaul.png",
    district: "srinagar",
    englishAudioFile: "media/Lassa Kaul English.m4a",
    urduAudioFile: "media/Lassa Kaul urdu.m4a",
    content:
      "Lassa Kaul was a resident of Srinagar. He was the director of Door darshan Centre, and a calm and composed man. His cultured demeanor had won him maximum friends and well-wishers among both, the hindus and the muslims. But with rising voices of Muslim bigotry he was projected as the enemy of Islam, responsible for launching a cultural aggression on the Muslims through his programs on the Television center. JKLF attackers, who were critical of news station’s pro-India programs had threatened Kaul a several times. On 13th February 1990, at about 7:15 PM ,45-year old Kaul was getting out of his car to meet his ailing parents when he was gunned down by the terrorists.",
  },
  {
    name: "Mushir Ul Haq",
    dateStr: "Apr 6, 1990",
    image: "images/mushir-ul-haq.png",
    district: "srinagar",
    englishAudioFile: "media/Mushir ul haq English.m4a",
    urduAudioFile: "media/Musheer ul Haq Urdu.m4a",
    content: `On April 6 1990 an armed rebellion had broken out in Srinagar against Indian rule. A white ambassador car started off from the vice-chancellor’s lodge and made its way towards Sir Syed Gate of the Varsity. Inside the car was Prof Mushir-ul-Haq, the vice-chancellor of the University  of Kashmir, his personal secretary, Abdul Gani and an orderly. Haq was on his way to offer Friday prayers when Four armed men lurking outside the University brought the car to a halt by pointing a gun at the driver and forcibly getting in.

      The news of VC's kidnapping was announced in the evening on Doordarshan. On the same day, the student wing of JKLF, claimed responsibility for the kidnapping. Four days later, on April 10,  the bullet riddled bodies of Mr Haq and his personal secretary Gani were found on the road near a canal. Post mortem found 12 bullet wounds on Mr Haq’s body.`,
  },
  {
    name: "Nurse Sarla Bhat",
    dateStr: "Apr 19, 1990",
    image: "images/sarla-bhat.png",
    district: "srinagar",
    englishAudioFile: "media/Sarla bhat English.m4a",
    urduAudioFile: "media/Sarla Bhat urdu.m4a",
    content:
      "Nurse Sarla Bhatt was the most high profile killing of a Kashmiri Pundit woman by JKLF militants. She was a staff nurse at Sher-e-Kashmir, Institute of Medical Sciences. She was kidnapped from her hostel on 14th April 1990 and tortured and gangraped for five days and finally her dead body was thrown on the main road on April 19. Her body bore multiple marks of violence, injuries, burn marks and four bullet shots. Breath taking moment was when not a single neighbour was allowed to the cremation ground during the performance of last rites. She was accused of spying for Indian army and intelligence.",
  },
  {
    name: "Mirwaiz Maulvi Farooq Shah",
    dateStr: "May 21, 1990",
    image: "images/mirwaiz-md-farooq-shah.png",
    district: "budgam",
    englishAudioFile: "media/Mirwaiz English.m4a",
    urduAudioFile: "media/Mirwaiz urdu.m4a",
    content: `Mirwaiz Farooq Shah was the most prominent Kashmiri Muslim Sunni religious leader. He was a custodian of Kashmir's most prominent Jamia Masjid in downtown Srinagar and also chairman of All Jammu & Kashmir Awami Action Committee, a coalition of disparate political parties in Jammu and Kashmir that sought resolution of the Kashmir conflict

      Shah was assassinated by militants of Pakistan supported Hizbul Mujahideen on 21 May 1990 near his home in Nageen in Srinagar. Hizbul Mujahideen militant Mohammad Ayub Dar was convicted for the murder and Supreme Court of India upheld the conviction in 2010
     
     He was father of Mirwaiz Umar Farooq, a prominent religious and political leader of Kashmir.`,
  },
  {
    name: "Wali Muhammad Itoo",
    dateStr: "15 April, 1994",
    image: "images/itoo.png",
    district: "jammu",
    englishAudioFile: "media/Itoo English.m4a",
    urduAudioFile: "media/Wali Muhammad Itoo Urdu.m4a",
    content: `Wali Mohammed Itoo was the former Speaker of J&K state assembly from National Conference Party. He worked selflessly for the benefit and welfare of the people of Jammu and Kashmir and contributed towards the growth and development of democratic institutions.

      He was killed in March 1994 by Pakistani militants in Jammu city. A militants walked up to Itoo in a congested lane, as soon as he came out of the Jamia Masjid after the Friday prayers, and shot him at point blank range.
      
       He was the father of prominent female politician Sakina Itoo.`,
  },
  {
    name: "Aga Syed Mehdi",
    dateStr: "Nov 3, 2000",
    image: "images/aga-syed.png",
    district: "budgam",
    englishAudioFile: "media/Aga syed mehdi English.m4a",
    urduAudioFile: "media/Aga Syed Mehdi Urdu.m4a",
    content:
      "Aga Syed Mehdi was the most prominent Kashmiri Shia religious cum political leader. He was from Budgam's prominent Aga family and son of a well known leader Aga Syed Mustafa Mousavi. He was killed on 3rd November 2000 in an IED blast.along with three of his security guards at village Kanihama in Budgam, J&K. The IED was planted in an underground water pipe. It exploded when the vehicle passed over the spot ripping apart the bullet proof gypsy. The blast was so powerful that the occupants were blown to pieces and the police had difficulty in identifying the bodies. His death was mourned by all sections of Kashmiri society including Kashmiri Pundits and Sunnis of Budgam. As news of the incident reached Budgam, Srinagar and areas in north Kashmir, supporters of the slain leader took to the streets shouting religious slogans. Shopkeers in Shia-dominated areas of Budgam, Pattan and Srinagar downed their shutters.",
  },
  {
    name: "Abdul Ghani Lone",
    dateStr: "May 21, 2002",
    image: "images/ghani-lone.png",
    district: "srinagar",
    englishAudioFile: "media/Abdul Ghani Lone English.m4a",
    urduAudioFile: "media/Abdul Ghani Lone urdu.m4a",
    content:
      "Born on 6 May 1932, in a village in Kupwara, Abdul Gani Lone came from a humble background. His passion to deliver justice to people superseded all obstacles and he began to rise and shine as a unique leader of his times. Majority of the people of his area supported him, as they knew his intention of entering politics was not some petty financial gains or fame but his passion. In 1967, he won the State Assembly elections from Handwara and in 1971, he became the state Cabinet Minster. In 1978, Lone founded Jammu Kashmir peoples Conference, in which many politicians, social activists. He was the one true politician in the Hurriyat, and the rest of the Hurriyat leadership envied him for his political skills and sagacity. On May 21, 2002, Abdul Ghani Lone was gunned down as he attended the 12th memorial service for Mirwaiz Moulvi Farooq, at the Edgah in Srinagar’s old town.",
  },
  {
    name: "Ghulam Nabi Lone",
    dateStr: "Oct 18, 2005",
    image: "images/ghulam-nabi-lone.png",
    district: "srinagar",
    englishAudioFile: "media/Ghulam Nabi Lone English.m4a",
    urduAudioFile: "media/Ghulam Nabi Lone urdu.m4a",
    content: `A doctor by profession, Jammu and Kashmir Education Minister Ghulam Nabi Lone, 62, had joined active politics in 2002 when the ruling PDP had joined mainstream politics.

      He was killed in a fidayeen (suicide) attack at his Tulsibagh area residence in Srinagar on Tuesday morning. Police said two fidayeen militants made their way into the high security area wearing police uniforms.The two stormed Dr Lone's house and opened fire indiscriminately, seriously injuring the minister who succumbed to his injuries in hospital.In the ensuing gun battle, two security men and a militant were killed. A civilian was also injured in the shootout, succumbed to his injuries later, taking the toll to 5.`,
  },
  {
    name: "Maulana Shaukat Ahmed",
    dateStr: "April 8, 2011",
    image: "images/maulana-shaukata-ahmed.png",
    district: "srinagar",
    englishAudioFile: "media/Shaukat ahmed English.m4a",
    urduAudioFile: "media/Maulana Shaukat urdu.m4a",
    content: `Maulana Shaukat Ahmad was the most prominent religious leader of Jamiat-e-Ahle-Hadees. Under his leadership Ahle Hadees grew to have about 15 lakh followers and more than 800 Mosques spread across the valley. He held pro-freedom views and yet he was known to be a liberal who was very vocal against all forms of violence. He openly denounced stone pelting and other such disruptive activities as un-Islamic and went to the extent of issuing a fatwa against them. He was in favour of engaging with the interlocutors appointed by the Centre and despite raised eyebrows from the separatist camp, he held several discussions with them.

      In the process, he earned the ire of the likes of Syed Ali Shah Geelani but was undeterred in his ideas. He was believed to be assassinated by militants of LeT in 2011 in an explosion as he parked his car at a regular spot while arriving at his mosque for Friday prayers. Many believe that his strong differences will Syed Ali Shah Geelani played an important role in his killing`,
  },
  {
    name: "Sujaat Bukhari",
    dateStr: "15 June, 2018",
    image: "images/sujaat-bukhari.png",
    district: "srinagar",
    englishAudioFile: "media/Shujaat Bukhari English.m4a",
    urduAudioFile: "media/Sujaat Bukhari urdu.m4a",
    content: `Shujaat Bukhari was a prominent journalist and editor. He founded Rising Kashmir, a well known local daily, in 2008. Bukhari had  a vast experience in journalism and was internationally renowned. Prior to 2008, Bukhari worked as the State Bureau Chief for 'The Hindu' Group. 

      Bukhari started receiving threats on his life in 1996. He was among a group of 19 journalists who were kidnapped by militants. Bukhari saved the day: he had a knack for memorizing phone numbers, and managed to use the landline in the room where they were being held to call a colleague The journalists were released safely. In 2006, Bukhari narrowly escaped an assassination attempt when his attacker’s gun jammed. However, he was not so lucky on 15 June 2018 when Bukhari was shot dead by an unidentified gunman in Srinagar. One of his guards was also killed in the attack and the other was critically injured.`,
  },
  {
    name: "Babar Qadri",
    dateStr: "Sept 24, 2020",
    image: "images/babar-qadri.png",
    district: "srinagar",
    englishAudioFile: "media/Babar qadri English.m4a",
    urduAudioFile: "media/Babar Qadri Urdu.m4a",
    content: `Babar Qadri was a very well-known young lawyer, activist and media personality, who even floated his own political party-Jammu & Kashmir People's Justice Party.  Qadri was known to take up cases for juvenile justice such as cases where juveniles had been booked by the state. Qadri identified himself as "pro-Kashmir and not anti-India". He was quick to question separatist leaders and politics within Kashmir

    In the days leading up to his death, Qadri had said in his social media posts that he feared his killing by Pakistan militants after his name appeared in Pakistani blog on Kashmir, " Kashmir Fightz".
    
    On the evening of September 24 two visitors arrived Qadri's home posing as clients.The advocate met the visitors in the lawn and started chatting. While Babar was still going through the files, one of the visitors opened fire on him. His assassination is said to have been carried out  by TRF ( The Resistance Front ), a Pakistan backed terrorist organisation.`,
  },
  {
    name: "Bhupinder Singh Bali",
    dateStr: "Sep 23, 2020",
    image: "images/bhupinder-singh.png",
    district: "srinagar",
    englishAudioFile: "media/Bhupinder Singh English.m4a",
    urduAudioFile: "media/Bhupinder Singh Urdu.m4a",
    content: `Bhupinder Singh Bali was a member of Kashmir's Sikh community and BDC chairman from Khag Beerwah constituency of central Kashmir's Budgam District. 

    Bhupinder Singh was residing with his family at Aloochi Bagh, Srinagar. He was given two PSOs for personal security, whom he had dropped at Khag police station as he headed towards his house in Srinagar 
    
    He was killed by Pakistan supported militants in Dalwash village on 23 September 2020 at 7.54 pm to install fear among Kashmiri people to stop them from participating in Panchayat, BDC and DDC elections.`,
  },
  {
    name: "Waseem Bari",
    dateStr: "Jul 8, 2020",
    image: "images/waseem-bari.png",
    district: "bandipore",
    englishAudioFile: "media/Wasim bari English.m4a",
    urduAudioFile: "media/Wasim bari Urdu.m4a",
    content: `Wasim Bari was a political leader of Kashmir unit of BJP and a former BJP President of Bandipora district. His brother and father were also BJP members. The family had had a security detail assigned to them. However, on 8 July 2020 at around 9 PM, Bari was sitting outside his own shop on the first floor of the building. Suddenly, a bike-borne assailant who was reportedly armed with a gun fitted with a silencer attacked Bari with gun shots. During the indiscriminate firing Wasim Bari, his father Bashir Ahmad and brother Umer Bashir got fatally injured.They were shifted to hospital, but all three succumbed to their injuries.

    The killing was condemned by PM Narendra Modi and all top leaders of Kashmir`,
  },
];

var onlyNames = persons.map((d) => d.name);

// persons.forEach((person) => {
//   person.date = tp(person.dateStr);
// });

// eslint-disable-next-line no-extend-native
Array.prototype.rotate = (function () {
  var unshift = Array.prototype.unshift,
    splice = Array.prototype.splice;

  return function (count) {
    var len = this.length >>> 0,
      // eslint-disable-next-line
      count = count >> 0;

    unshift.apply(this, splice.call(this, count % len, len));
    return this;
  };
})();

const Presentation = () => {
  // const [persons] = useState(persons);
  // const timelineRef = useRef(null);
  const [personsTickerOrder, setPersonsTickerOrder] = useState(persons);
  const [activePerson, setActivePerson] = useState(null);
  const [activeYear, setActiveYear] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  function tickerChange(newActivePerson, dir) {
    if (newActivePerson === null) {
      // hide timeline and circle and return
      select("#timeline").transition().style("opacity", 0);
      select("#person-ticker").transition().style("opacity", 0);
      return;
    } else {
      select("#timeline").transition().style("opacity", 1);
      select("#person-ticker").transition().style("opacity", 1);
    }
    setActivePerson(newActivePerson);
    // setActivePersonIndex((() => onlyNames.indexOf(newActivePerson));

    setPersonsTickerOrder((oldPersons) => {
      var rotateDir = dir === "down" ? 1 : 1;

      // rotate the persons array in order to make the new active person appear as the main one.
      // the active person has to come as the second last element in the array
      // so rotate the array from the previous active person's index to the new person's index

      var targetIndex = onlyNames.length - 2;
      var newActiveIndex = onlyNames.indexOf(newActivePerson.name);
      var newPersons, newOnlyNames;

      newOnlyNames = onlyNames.slice();
      newPersons = oldPersons.slice();

      // there can be two directions in which we rotate, forward or backward.
      // figure out the smaller one
      while (newActiveIndex !== targetIndex) {
        newPersons = newPersons.slice().rotate(1);
        newOnlyNames = newOnlyNames.slice().rotate(1);
        newActiveIndex = newOnlyNames.indexOf(newActivePerson.name);
      }

      onlyNames = newOnlyNames.slice();

      return newPersons;
    });
  }

  function activeYearChange(newActiveYear) {
    setActiveYear(newActiveYear);
  }

  function hideLanguageToggle() {
    select("#toggle-language").transition().style("opacity", 0);
  }

  function showLanguageToggle() {
    select("#toggle-language").transition().style("opacity", 1);
  }

  function changeActiveStep(scrollamaData) {
    const dir = scrollamaData.direction;
    const el = scrollamaData.element;
    const person = scrollamaData.data;

    if (person.name) {
      window.activePerson = person.name;
      const year = person.dateStr.slice(-4);

      activeYearChange(year);
      tickerChange(person, dir);
      showLanguageToggle();
    } else {
      window.activePerson = null;
      activeYearChange(null);
      tickerChange(null, dir);
      hideLanguageToggle();
    }

    var wavesurferInstance = el.getElementsByClassName("person-container")[0];

    if (wavesurferInstance) {
      wavesurferInstance = wavesurferInstance.wavesurferInstance;

      handlePlay(wavesurferInstance);
    } else {
      if (window.activeAudio) {
        window.activeAudio.stop();
      }

      window.activeAudio = null;
    }
  }

  function handlePlay(wavesurferInstance) {
    Array.from(document.getElementsByClassName("waveform-container")).forEach(
      (el) => {
        el.data.pause();
      }
    );

    if (window.activeAudio) {
      window.activeAudio.stop();
    }

    if (wavesurferInstance) {
      wavesurferInstance.play();

      window.activeAudio = wavesurferInstance;
    }
  }

  function handleToggleLanguage(event) {
    // setSelectedLanguage(event.target.dataset.value);
    window.selectedLanguage = event.target.dataset.value;
    setSelectedLanguage(event.target.dataset.value);
  }

  return (
    <div id="main-container">
      <BackgroundAudio
        audioFile={"media/background.m4a"}
        muted={window.muted}
      ></BackgroundAudio>
      <PersonTicker
        persons={personsTickerOrder}
        activeDistrict={activePerson ? activePerson.district : null}
      ></PersonTicker>
      <Toggle
        options={["urdu", "english"]}
        toggleFunc={handleToggleLanguage}
        selectedLanguage={selectedLanguage}
      />

      <Timeline activeYear={activeYear}></Timeline>
      <Scrollama onStepEnter={changeActiveStep} offset={0.7}>
        <Step
          data={{
            person: null,
            dateStr: null,
            imageStr: null,
          }}
        >
          <div className="head-step scrollama-step-wrapper">
            <Head toggleLanguage={handleToggleLanguage}></Head>
          </div>
        </Step>

        {persons.map((person, i) => {
          return (
            <Step data={person} key={i}>
              <div className="scrollama-step-wrapper">
                <Person
                  {...person}
                  key={person.name}
                  index={i}
                  handlePlay={handlePlay}
                  selectedLanguage={selectedLanguage}
                  thisPersonIsActive={
                    activePerson && activePerson.name === person.name
                      ? true
                      : false
                  }
                ></Person>
              </div>
            </Step>
          );
        })}

        <Step
          data={{
            person: null,
            dateStr: null,
            imageStr: null,
          }}
        >
          <div
            className="end-hashtags-step scrollama-step-wrapper"
            id="map-container"
          >
            <EndHashtags></EndHashtags>
          </div>
        </Step>
      </Scrollama>

      <Footer></Footer>
    </div>
  );
};

ReactDOM.render(<Presentation />, document.getElementById("root"));
