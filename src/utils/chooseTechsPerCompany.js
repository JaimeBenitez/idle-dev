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

export default function chooseTechsPerCompany(companyId){
    switch(companyId){
      case 1: 
        return[
          { "src": HTML, "alt": "HTML", "id": 1 },
          { "src": CSS, "alt": "CSS", "id": 2 },
          { "src": JS, "alt": "JS", "id": 3 }
          ]
      case 2: 
        return[
          { "src": Node,"alt": "Node", "id": 4 },
          { "src": Java,"alt": "Java", "id": 5 },
          { "src": PHP, "alt": "PHP", "id": 6 },
          { "src": Python, "alt": "Python", "id": 7 },
          ]
      case 3:
        return[
              { "src": HTML, "alt": "HTML", "id": 1 },
              { "src": CSS, "alt": "CSS", "id": 2 },
              { "src": JS, "alt": "JS", "id": 3 },
              { "src": Node,"alt": "Node", "id": 4 },
              { "src": Java,"alt": "Java", "id": 5 },
              { "src": PHP, "alt": "PHP", "id": 6 },
              { "src": Python, "alt": "Python", "id": 7 },
            ] 
      case 4:
        return[
          { "src": Kotlin, "alt": "Kotlin", "id": 8 },
          { "src": Swift, "alt": "Swift", "id": 9 },
          { "src": RN, "alt": "React Native", "id": 10 },
        ] 
      case 5:
        return[
          { "src": Despliegue, "alt": "Despliegue", "id": 11 },
          { "src": OS, "alt": "OS", "id": 12 },
        ] 
      case 6:
        return[
          { "src": Unity, "alt": "Unity", "id": 13 },
          { "src": Unreal, "alt": "Unreal Engine", "id": 14 },
        ] 
    }
  }