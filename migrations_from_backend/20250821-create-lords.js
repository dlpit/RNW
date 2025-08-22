'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Lords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      memberId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Members',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      lordId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      allianceId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      allianceTag: {
        type: Sequelize.STRING,
        allowNull: true
      },
      faction: {
        type: Sequelize.STRING,
        allowNull: true
      },
      homeServer: {
        type: Sequelize.STRING,
        allowNull: true
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true
      },
      mapId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      currentPower: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      power: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      highestPower: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      highestPowerOld: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      highestPowerNew: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      powerIncrease: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      powerIncreasePercent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      buildingPower: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      heroPower: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      legionPower: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      techPower: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      powerRanking: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      meritRanking: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      t4KillRanking: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      t5KillRanking: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      inPowerRankings: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      gold: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      goldOld: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      goldNew: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      goldIncrease: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      goldIncreasePercent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      goldSpent: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      goldSpentOld: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      goldSpentNew: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      goldSpentIncrease: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      goldSpentIncreasePercent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      wood: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      woodOld: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      woodNew: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      woodIncrease: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      woodIncreasePercent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      woodSpent: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      woodSpentOld: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      woodSpentNew: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      woodSpentIncrease: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      woodSpentIncreasePercent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      stoneSpent: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      stoneSpentOld: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      stoneSpentNew: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      stoneSpentIncrease: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      stoneSpentIncreasePercent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      ore: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      oreOld: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      oreNew: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      oreIncrease: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      oreIncreasePercent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      gems: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      gemsOld: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      gemsNew: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      gemsIncrease: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      gemsIncreasePercent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      gemsSpent: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      gemsSpentOld: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      gemsSpentNew: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      gemsSpentIncrease: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      gemsSpentIncreasePercent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      mana: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      manaOld: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      manaNew: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      manaIncrease: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      manaIncreasePercent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      manaSpent: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      manaSpentOld: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      manaSpentNew: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      manaSpentIncrease: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      manaSpentIncreasePercent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      merits: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      meritsOld: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      meritsNew: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      meritIncrease: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      meritIncreasePercent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      unitsKilled: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      unitsKilledOld: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      unitsKilledNew: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      killsIncrease: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      killsIncreasePercent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      killcountT1: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      killcountT1Old: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      killcountT1New: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      t1KillIncrease: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      t1KillIncreasePercent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      killcountT2: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      killcountT2Old: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      killcountT2New: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      t2KillIncrease: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      t2KillIncreasePercent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      killcountT3: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      killcountT3Old: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      killcountT3New: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      t3KillIncrease: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      t3KillIncreasePercent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      killcountT4: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      killcountT4Old: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      killcountT4New: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      t4KillIncrease: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      t4KillIncreasePercent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      killcountT5: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      killcountT5Old: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      killcountT5New: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      t5KillIncrease: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      t5KillIncreasePercent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      unitsDead: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      unitsDeadOld: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      unitsDeadNew: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      deadIncrease: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      deadIncreasePercent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      unitsHealed: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      unitsHealedOld: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      unitsHealedNew: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      healedIncrease: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      healedIncreasePercent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      victories: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      victoriesOld: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      victoriesNew: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      victoriesIncrease: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      victoriesIncreasePercent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      defeats: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      defeatsOld: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      defeatsNew: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      defeatsIncrease: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      defeatsIncreasePercent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      helpsGiven: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      helpsGivenOld: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      helpsGivenNew: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      helpsIncrease: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      helpsIncreasePercent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      dkps: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      troopsRemaining: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      troopsRemainingPercent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      citySieges: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      resourcesGiven: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      resourcesGivenCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      scouted: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      townCenter: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add indexes
    await queryInterface.addIndex('Lords', ['memberId'], {
      unique: true,
      name: 'lords_member_id_unique'
    });
    
    await queryInterface.addIndex('Lords', ['lordId'], {
      name: 'lords_lord_id_index'
    });
    
    await queryInterface.addIndex('Lords', ['name'], {
      name: 'lords_name_index'
    });
    
    await queryInterface.addIndex('Lords', ['currentPower'], {
      name: 'lords_current_power_index'
    });
    
    await queryInterface.addIndex('Lords', ['powerRanking'], {
      name: 'lords_power_ranking_index'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Lords');
  }
};
