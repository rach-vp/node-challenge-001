exports.seed = async (knex) => knex('articles').del()
  .then(() => knex('articles').insert([
    {
      author_id: 1,
      category: 'web development',
      title: 'React vs Vue battle',
      summary: 'Of course Vue is better!',
      first_paragraph: 'Mussum Ipsum, cacilds vidis litro abertis. Diuretics paradis num copo é motivis de denguis. Leite de capivaris, leite de mula manquis sem cabeça. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Per aumento de cachacis, eu reclamis.',
      body: `Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis. Leite de capivaris, leite de mula manquis sem cabeça. A ordem dos tratores não altera o pão duris. Detraxit consequat et quo num tendi nada.

        Atirei o pau no gatis, per gatis num morreus. Delegadis gente finis, bibendum egestas augue arcu ut est. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.`,
    },
    {
      author_id: 2,
      category: 'technical analysis',
      title: 'Elliot waves counting at ESFUT',
      summary: 'How waves counting can improve your studies',
      first_paragraph: 'Mussum Ipsum, cacilds vidis litro abertis. Diuretics paradis num copo é motivis de denguis. Leite de capivaris, leite de mula manquis sem cabeça. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Per aumento de cachacis, eu reclamis.',
      body: `Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis. Leite de capivaris, leite de mula manquis sem cabeça. A ordem dos tratores não altera o pão duris. Detraxit consequat et quo num tendi nada.

        Atirei o pau no gatis, per gatis num morreus. Delegadis gente finis, bibendum egestas augue arcu ut est. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.`,
    },
  ]));
