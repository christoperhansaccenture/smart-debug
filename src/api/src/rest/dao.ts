'use strict';
module DAO {
    export interface DAO {
        getMinutesToRace():Promise<string>;
    }
}