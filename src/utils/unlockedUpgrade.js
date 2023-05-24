export default function unlockedUpgrade(techId, newLevel){  
    
    let upgradeId = null

    switch (newLevel){
        case "intermedio":
            switch (techId) {
                case 1:
                    upgradeId = 1
                    break 
                case 2:
                    upgradeId = 4
                    break
                case 3: 
                    upgradeId = 7
                    break
                case 4:
                    upgradeId = 10
                    break 
                case 5:
                    upgradeId = 13
                    break
                case 6: 
                    upgradeId = 16
                    break
                case 7:
                    upgradeId = 19
                    break 
                case 8:
                    upgradeId = 22
                    break
                case 9: 
                    upgradeId = 25
                    break
                case 10:
                    upgradeId = 28
                    break 
                case 11:
                    upgradeId = 31
                    break
                case 12: 
                    upgradeId = 34
                    break
                case 13:
                    upgradeId = 37
                    break
                case 14: 
                    upgradeId = 40
                    break   
            }
            break

        case "junior":
            switch (techId){
                case 1:
                    upgradeId = 2
                    break 
                case 2:
                    upgradeId = 5
                    break
                case 3: 
                    upgradeId = 8
                    break
                case 4:
                    upgradeId = 11
                    break 
                case 5:
                    upgradeId = 14
                    break
                case 6: 
                    upgradeId = 17
                    break
                case 7:
                    upgradeId = 20
                    break 
                case 8:
                    upgradeId = 23
                    break
                case 9: 
                    upgradeId = 26
                    break
                case 10:
                    upgradeId = 29
                    break 
                case 11:
                    upgradeId = 32
                    break
                case 12: 
                    upgradeId = 35
                    break
                case 13:
                    upgradeId = 38
                    break
                case 14: 
                    upgradeId = 41
                    break   
            }
            break
        case "senior":
            switch (techId){
                case 1:
                    upgradeId = 3
                    break 
                case 2:
                    upgradeId = 6
                    break
                case 3: 
                    upgradeId = 9
                    break
                case 4:
                    upgradeId = 12
                    break 
                case 5:
                    upgradeId = 15
                    break
                case 6: 
                    upgradeId = 18
                    break
                case 7:
                    upgradeId = 21
                    break 
                case 8:
                    upgradeId = 24
                    break
                case 9: 
                    upgradeId = 27
                    break
                case 10:
                    upgradeId = 30
                    break 
                case 11:
                    upgradeId = 33
                    break
                case 12: 
                    upgradeId = 36
                    break
                case 13:
                    upgradeId = 39
                    break
                case 14: 
                    upgradeId = 42
                    break   
            }
            break
    }
    return upgradeId
}