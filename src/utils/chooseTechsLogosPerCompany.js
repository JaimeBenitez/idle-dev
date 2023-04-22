import HTML from '@/assets/html.svg'
import CSS from '@/assets/css.svg'
import JS from '@/assets/js.svg'
import Node from '@/assets/nodejs.svg'
import Java from '@/assets/java.svg'
import PHP from '@/assets/php.svg'

export default function chooseTechsLogosPerCompany(companyId){
    switch(companyId){
      case 1: 
        return[
          { "src": HTML, "alt": "HTML" },
          { "src": CSS, "alt": "CSS" },
          { "src": JS, "alt": "JS" }
          ]
      case 2: 
          return[
          { "src": Node,"alt": "Node" },
          { "src": Java,"alt": "Java" },
          { "src": PHP, "alt": "PHP" }
          ]
      case 3:
      return[
            { "src": HTML, "alt": "HTML" },
            { "src": CSS, "alt": "CSS" },
            { "src": JS, "alt": "JS" },
            { "src": Node,"alt": "Node" },
            { "src": Java,"alt": "Java" },
            { "src": PHP, "alt": "PHP" }
          ] 
    }
  }