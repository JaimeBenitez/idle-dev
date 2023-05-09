import HTML from '@/assets/html.svg'
import CSS from '@/assets/css.svg'
import JS from '@/assets/js.svg'
import Node from '@/assets/nodejs.svg'
import Java from '@/assets/java.svg'
import PHP from '@/assets/php.svg'
import Python from '@/assets/python.svg'
import Kotlin from '@/assets/kotlin.svg'
import OS from '@/assets/os.svg'
import Despliegue from '@/assets/production.svg'
import RN  from '@/assets/react-native.svg'
import Swift from '@/assets/swift.svg'
import Unity from '@/assets/unity.svg'
import Unreal from '@/assets/unreal-engine.svg'

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
              { "src": PHP, "alt": "PHP" },
              { "src": Python, "alt": "Python" },
            ] 
      case 4:
        return[
          { "src": Kotlin, "alt": "Kotlin" },
          { "src": Swift, "alt": "Swift" },
          { "src": RN, "alt": "React Native" },
        ] 
      case 5:
        return[
          { "src": Despliegue, "alt": "Despliegue" },
          { "src": OS, "alt": "OS" },
        ] 
      case 6:
        return[
          { "src": Unity, "alt": "Unity" },
          { "src": Unreal, "alt": "Unreal Engine" },
        ] 
    }
  }