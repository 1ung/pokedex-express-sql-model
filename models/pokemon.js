/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPool) => {
  // `dbPool` is accessible within this function scope
  return {
    create: (pokemon, callback) => {
      // set up query
      const queryString = `INSERT INTO pokemons (name, num, img, weight, height)
        VALUES ($1, $2, $3, $4, $5)`;
      const values = [
        pokemon.name,
        pokemon.num,
        pokemon.img,
        pokemon.weight,
        pokemon.height
      ];

      // execute query
      dbPool.query(queryString, values, (err, queryResult) => {
        // invoke callback function with results after query has executed
        callback(err, queryResult);
      });
    },

    get: (id, callback) => {
      const values = [id];

      dbPool.query('SELECT * from pokemons WHERE id=$1', values, (error, queryResult) => {
        callback(error, queryResult);
      });
    },

    update: (pokemon, callback) => {
      const queryString = 'UPDATE pokemons SET name=$1, img=$2, weight=$3, height=$4 WHERE pokemons.id = $5';
      const values = [
        pokemon.name,
        pokemon.img,
        pokemon.weight,
        pokemon.height,
        parseInt(pokemon.id)
      ];
      dbPool.query(queryString, values, (error, queryResult) => {
        callback(error, queryResult);
      });
    }
  };
};
