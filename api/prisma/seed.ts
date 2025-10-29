import { PrismaClient, GroupVisibility, GroupRole } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Nettoyage de la base
  console.log('🧹 Cleaning database...');
  await prisma.hotSawPick.deleteMany();
  await prisma.globalChampionPick.deleteMany();
  await prisma.pronoGroupMember.deleteMany();
  await prisma.pronoGroup.deleteMany();
  await prisma.competitionResult.deleteMany();
  await prisma.competition.deleteMany();
  await prisma.athlete.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Database cleaned');

  // ==================== ATHLETES ====================
  console.log('👤 Creating athletes...');

  const athletes = await Promise.all([
    // Champions légendaires
    prisma.athlete.create({
      data: {
        firstName: 'Jason',
        lastName: 'Wynyard',
        countryCode: 'NZ',
        birthDate: new Date('1973-08-19'),
        biography: 'Légende du bûcheronnage sportif, Jason Wynyard est considéré comme l\'un des plus grands athlètes de l\'histoire de ce sport. Avec ses multiples titres mondiaux et sa domination dans les années 2000, il a redéfini les standards de performance.',
        specialty: 'Underhand Chop, Standing Block Chop',
        achievements: '9x Champion du Monde STIHL TIMBERSPORTS, 3x Champion All-Around',
        personalRecords: 'Underhand Chop: 15.94s, Standing Block: 18.65s',
      },
    }),
    prisma.athlete.create({
      data: {
        firstName: 'Stirling',
        lastName: 'Hart',
        countryCode: 'US',
        birthDate: new Date('1982-03-15'),
        biography: 'Champion américain reconnu pour sa puissance et sa technique exceptionnelle. Stirling Hart a dominé les compétitions américaines pendant plus d\'une décennie.',
        specialty: 'Hot Saw, Stock Saw',
        achievements: '5x Champion USA, 2x Médaillé Mondial',
        personalRecords: 'Hot Saw: 5.78s, Stock Saw: 8.92s',
      },
    }),
    prisma.athlete.create({
      data: {
        firstName: 'Brayden',
        lastName: 'Meyer',
        countryCode: 'AU',
        birthDate: new Date('1995-06-22'),
        biography: 'Jeune prodige australien, Brayden Meyer représente la nouvelle génération du bûcheronnage sportif. Sa rapidité et sa précision font de lui un adversaire redoutable.',
        specialty: 'Springboard, Underhand Chop',
        achievements: '2x Champion d\'Australie, Champion Mondial Junior',
        personalRecords: 'Springboard: 45.32s, Underhand Chop: 17.21s',
      },
    }),
    prisma.athlete.create({
      data: {
        firstName: 'Martin',
        lastName: 'Komárek',
        countryCode: 'CZ',
        birthDate: new Date('1988-11-08'),
        biography: 'Champion tchèque et fierté européenne, Martin Komárek a mis le bûcheronnage sportif européen sur la carte mondiale avec ses performances exceptionnelles.',
        specialty: 'Single Buck, Standing Block Chop',
        achievements: '6x Champion d\'Europe, Vice-Champion du Monde',
        personalRecords: 'Single Buck: 12.45s, Standing Block: 20.11s',
      },
    }),
    prisma.athlete.create({
      data: {
        firstName: 'Laurence',
        lastName: 'O\'Toole',
        countryCode: 'AU',
        birthDate: new Date('1976-04-12'),
        biography: 'Vétéran australien respecté, Laurence O\'Toole est une légende vivante du Hot Saw. Son expérience et sa maîtrise technique font de lui un compétiteur redoutable.',
        specialty: 'Hot Saw',
        achievements: '8x Champion Hot Saw, 4x Record du Monde',
        personalRecords: 'Hot Saw: 5.35s (Record du Monde)',
      },
    }),
    prisma.athlete.create({
      data: {
        firstName: 'Matt',
        lastName: 'Cogar',
        countryCode: 'US',
        birthDate: new Date('1990-09-28'),
        biography: 'Athlète américain polyvalent, Matt Cogar excelle dans toutes les disciplines. Sa constance et sa détermination lui ont valu de nombreux titres.',
        specialty: 'All-Around',
        achievements: '3x Champion USA All-Around, Médaillé Mondial',
        personalRecords: 'Underhand Chop: 16.78s, Stock Saw: 9.15s',
      },
    }),
    prisma.athlete.create({
      data: {
        firstName: 'Brad',
        lastName: 'De Losa',
        countryCode: 'US',
        birthDate: new Date('1985-12-03'),
        biography: 'Connu pour sa puissance brute, Brad De Losa est un spécialiste des disciplines à la scie. Son style agressif en fait un favori du public.',
        specialty: 'Stock Saw, Single Buck',
        achievements: '4x Champion USA Saw, 2x Top 5 Mondial',
        personalRecords: 'Stock Saw: 8.67s, Single Buck: 11.89s',
      },
    }),
    prisma.athlete.create({
      data: {
        firstName: 'Glen',
        lastName: 'Gillam',
        countryCode: 'AU',
        birthDate: new Date('1992-07-17'),
        biography: 'Athlète australien technique et précis, Glen Gillam est réputé pour sa régularité exceptionnelle en compétition.',
        specialty: 'Springboard, Standing Block',
        achievements: 'Champion d\'Australie, 3x Top 10 Mondial',
        personalRecords: 'Springboard: 47.21s, Standing Block: 19.45s',
      },
    }),
    prisma.athlete.create({
      data: {
        firstName: 'Ferry',
        lastName: 'Svan',
        countryCode: 'SE',
        birthDate: new Date('1989-02-25'),
        biography: 'Champion scandinave, Ferry Svan a popularisé le bûcheronnage sportif en Suède et représente fièrement son pays sur la scène internationale.',
        specialty: 'Single Buck, Stock Saw',
        achievements: '7x Champion de Suède, Champion d\'Europe',
        personalRecords: 'Single Buck: 13.12s, Stock Saw: 9.89s',
      },
    }),
    prisma.athlete.create({
      data: {
        firstName: 'Arden',
        lastName: 'Cogar Jr.',
        countryCode: 'US',
        birthDate: new Date('1998-05-14'),
        biography: 'Fils de légende, Arden Cogar Jr. suit les traces de son père avec un talent exceptionnel. Jeune champion prometteur de la scène américaine.',
        specialty: 'Underhand Chop, Hot Saw',
        achievements: 'Champion USA Junior, 2x Champion USA',
        personalRecords: 'Underhand Chop: 17.05s, Hot Saw: 6.12s',
      },
    }),
    // Athlètes européens
    prisma.athlete.create({
      data: {
        firstName: 'Robert',
        lastName: 'Ebner',
        countryCode: 'AT',
        birthDate: new Date('1987-10-09'),
        biography: 'Champion autrichien polyvalent, Robert Ebner est un compétiteur acharné qui excelle dans les disciplines à la hache.',
        specialty: 'Standing Block, Underhand Chop',
        achievements: '5x Champion d\'Autriche, Médaillé Européen',
        personalRecords: 'Standing Block: 21.34s, Underhand Chop: 18.56s',
      },
    }),
    prisma.athlete.create({
      data: {
        firstName: 'Pierre',
        lastName: 'Puget',
        countryCode: 'FR',
        birthDate: new Date('1991-03-21'),
        biography: 'Premier français à briller sur la scène mondiale du bûcheronnage sportif. Pierre Puget inspire une nouvelle génération d\'athlètes français.',
        specialty: 'Single Buck, Springboard',
        achievements: '4x Champion de France, Top 15 Mondial',
        personalRecords: 'Single Buck: 14.67s, Springboard: 52.11s',
      },
    }),
    prisma.athlete.create({
      data: {
        firstName: 'Spike',
        lastName: 'Milton',
        countryCode: 'NZ',
        birthDate: new Date('1993-08-06'),
        biography: 'Compétiteur néo-zélandais explosif, Spike Milton est connu pour son énergie débordante et ses performances spectaculaires.',
        specialty: 'Hot Saw, Stock Saw',
        achievements: '3x Champion de Nouvelle-Zélande',
        personalRecords: 'Hot Saw: 6.45s, Stock Saw: 9.34s',
      },
    }),
    prisma.athlete.create({
      data: {
        firstName: 'Stan',
        lastName: 'Perich',
        countryCode: 'US',
        birthDate: new Date('1984-01-30'),
        biography: 'Vétéran américain respecté, Stan Perich continue de compétitionner au plus haut niveau malgré son âge, démontrant une longévité exceptionnelle.',
        specialty: 'All-Around',
        achievements: '6x Champion USA, 15+ années de compétition',
        personalRecords: 'Underhand Chop: 17.89s, Standing Block: 22.11s',
      },
    }),
    prisma.athlete.create({
      data: {
        firstName: 'Dave',
        lastName: 'Bolstad',
        countryCode: 'NZ',
        birthDate: new Date('1980-11-19'),
        biography: 'Légende néo-zélandaise du Springboard, Dave Bolstad détient plusieurs records et a inspiré toute une génération d\'athlètes.',
        specialty: 'Springboard',
        achievements: '7x Champion Springboard, 2x Record du Monde',
        personalRecords: 'Springboard: 42.67s (Record)',
      },
    }),
  ]);

  console.log(`✅ Created ${athletes.length} athletes`);

  // ==================== COMPETITIONS ====================
  console.log('🏆 Creating competitions...');

  const competitions = await Promise.all([
    // Compétitions futures
    prisma.competition.create({
      data: {
        id: 'comp_1',
        name: 'Championnat du Monde STIHL TIMBERSPORTS 2025',
        startAt: new Date('2025-12-01T10:00:00Z'),
      },
    }),
    prisma.competition.create({
      data: {
        id: 'comp_2',
        name: 'Trophée des Champions',
        startAt: new Date('2025-11-15T14:00:00Z'),
      },
    }),
    prisma.competition.create({
      data: {
        name: 'Coupe Européenne 2025',
        startAt: new Date('2025-10-20T09:00:00Z'),
      },
    }),
    prisma.competition.create({
      data: {
        name: 'US Open Championship',
        startAt: new Date('2025-09-15T12:00:00Z'),
      },
    }),
    prisma.competition.create({
      data: {
        name: 'Australian Masters',
        startAt: new Date('2025-08-10T08:00:00Z'),
      },
    }),
    prisma.competition.create({
      data: {
        name: 'New Zealand National Championship',
        startAt: new Date('2025-07-05T09:30:00Z'),
      },
    }),
    prisma.competition.create({
      data: {
        name: 'European Cup Final',
        startAt: new Date('2025-06-20T13:00:00Z'),
      },
    }),
    prisma.competition.create({
      data: {
        name: 'Swedish Open',
        startAt: new Date('2025-05-25T11:00:00Z'),
      },
    }),
    // Compétitions passées (pour avoir des résultats)
    prisma.competition.create({
      data: {
        name: 'Championnat du Monde 2024',
        startAt: new Date('2024-11-15T10:00:00Z'),
      },
    }),
    prisma.competition.create({
      data: {
        name: 'US Championship 2024',
        startAt: new Date('2024-09-20T14:00:00Z'),
      },
    }),
    prisma.competition.create({
      data: {
        name: 'Australian Open 2024',
        startAt: new Date('2024-08-10T09:00:00Z'),
      },
    }),
    prisma.competition.create({
      data: {
        name: 'European Masters 2024',
        startAt: new Date('2024-06-15T12:00:00Z'),
      },
    }),
  ]);

  console.log(`✅ Created ${competitions.length} competitions`);

  // ==================== USERS ====================
  console.log('👥 Creating test users...');

  const passwordHash = await hash('password123', 10);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        id: 'user_test_1',
        name: 'Test User 1',
        email: 'test1@betwood.com',
        emailVerified: true,
        accounts: {
          create: {
            id: 'account_test_1',
            accountId: 'test1@betwood.com',
            providerId: 'email-password', // Better Auth utilise 'email-password'
            password: passwordHash,
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        id: 'user_test_2',
        name: 'Test User 2',
        email: 'test2@betwood.com',
        emailVerified: true,
        accounts: {
          create: {
            id: 'account_test_2',
            accountId: 'test2@betwood.com',
            providerId: 'email-password', // Better Auth utilise 'email-password'
            password: passwordHash,
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        id: 'user_admin',
        name: 'Admin User',
        email: 'admin@betwood.com',
        emailVerified: true,
        accounts: {
          create: {
            id: 'account_admin',
            accountId: 'admin@betwood.com',
            providerId: 'email-password', // Better Auth utilise 'email-password'
            password: passwordHash,
          },
        },
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} test users`);
  console.log('📧 Test credentials:');
  console.log('   - test1@betwood.com / password123');
  console.log('   - test2@betwood.com / password123');
  console.log('   - admin@betwood.com / password123');

  // ==================== GROUPS ====================
  console.log('👥 Creating groups...');

  const groups = await Promise.all([
    prisma.pronoGroup.create({
      data: {
        name: 'Les Bûcherons Français 🇫🇷',
        visibility: GroupVisibility.PUBLIC,
        ownerId: users[0].id,
        competitionId: competitions[0].id,
        inviteCode: 'BUCHE-001',
        members: {
          create: [
            {
              userId: users[0].id,
              role: GroupRole.OWNER,
            },
            {
              userId: users[1].id,
              role: GroupRole.MEMBER,
            },
          ],
        },
      },
    }),
    prisma.pronoGroup.create({
      data: {
        name: 'Champions League 🏆',
        visibility: GroupVisibility.PRIVATE,
        ownerId: users[2].id,
        competitionId: competitions[1].id,
        inviteCode: 'CHAMP-002',
        members: {
          create: [
            {
              userId: users[2].id,
              role: GroupRole.OWNER,
            },
          ],
        },
      },
    }),
    prisma.pronoGroup.create({
      data: {
        name: 'Team Europe 🇪🇺',
        visibility: GroupVisibility.PUBLIC,
        ownerId: users[1].id,
        competitionId: competitions[2].id,
        inviteCode: 'EURO-003',
        members: {
          create: [
            {
              userId: users[1].id,
              role: GroupRole.OWNER,
            },
            {
              userId: users[0].id,
              role: GroupRole.MEMBER,
            },
            {
              userId: users[2].id,
              role: GroupRole.ADMIN,
            },
          ],
        },
      },
    }),
    prisma.pronoGroup.create({
      data: {
        name: 'USA Timber Pro 🇺🇸',
        visibility: GroupVisibility.PUBLIC,
        ownerId: users[0].id,
        competitionId: competitions[3].id,
        inviteCode: 'USA-004',
        members: {
          create: [
            {
              userId: users[0].id,
              role: GroupRole.OWNER,
            },
            {
              userId: users[2].id,
              role: GroupRole.MEMBER,
            },
          ],
        },
      },
    }),
    prisma.pronoGroup.create({
      data: {
        name: 'Aussie Legends 🇦🇺',
        visibility: GroupVisibility.PUBLIC,
        ownerId: users[1].id,
        competitionId: competitions[4].id,
        inviteCode: 'AUS-005',
        members: {
          create: [
            {
              userId: users[1].id,
              role: GroupRole.OWNER,
            },
            {
              userId: users[0].id,
              role: GroupRole.ADMIN,
            },
            {
              userId: users[2].id,
              role: GroupRole.MEMBER,
            },
          ],
        },
      },
    }),
    prisma.pronoGroup.create({
      data: {
        name: 'Kiwi Power 🥝',
        visibility: GroupVisibility.PRIVATE,
        ownerId: users[2].id,
        competitionId: competitions[5].id,
        inviteCode: 'KIWI-006',
        members: {
          create: [
            {
              userId: users[2].id,
              role: GroupRole.OWNER,
            },
            {
              userId: users[1].id,
              role: GroupRole.MEMBER,
            },
          ],
        },
      },
    }),
    prisma.pronoGroup.create({
      data: {
        name: 'Nordic Warriors ⚔️',
        visibility: GroupVisibility.PUBLIC,
        ownerId: users[0].id,
        competitionId: competitions[7].id,
        inviteCode: 'NORD-007',
        members: {
          create: [
            {
              userId: users[0].id,
              role: GroupRole.OWNER,
            },
          ],
        },
      },
    }),
  ]);

  console.log(`✅ Created ${groups.length} groups`);

  // ==================== PICKS (PRONOSTICS) ====================
  console.log('🎯 Creating sample picks...');

  const picksData = [
    // Compétition 1 - Championnat du Monde
    { userId: users[0].id, competitionId: competitions[0].id, globalChampion: athletes[0].id, hotSaw: athletes[4].id },
    { userId: users[1].id, competitionId: competitions[0].id, globalChampion: athletes[2].id, hotSaw: athletes[4].id },
    { userId: users[2].id, competitionId: competitions[0].id, globalChampion: athletes[0].id, hotSaw: athletes[12].id },

    // Compétition 2 - Trophée des Champions
    { userId: users[0].id, competitionId: competitions[1].id, globalChampion: athletes[1].id, hotSaw: athletes[1].id },
    { userId: users[1].id, competitionId: competitions[1].id, globalChampion: athletes[3].id, hotSaw: athletes[4].id },

    // Compétition 3 - Coupe Européenne
    { userId: users[0].id, competitionId: competitions[2].id, globalChampion: athletes[3].id, hotSaw: athletes[8].id },
    { userId: users[1].id, competitionId: competitions[2].id, globalChampion: athletes[10].id, hotSaw: athletes[8].id },
    { userId: users[2].id, competitionId: competitions[2].id, globalChampion: athletes[3].id, hotSaw: athletes[12].id },

    // Compétition 4 - US Open
    { userId: users[0].id, competitionId: competitions[3].id, globalChampion: athletes[1].id, hotSaw: athletes[9].id },
    { userId: users[2].id, competitionId: competitions[3].id, globalChampion: athletes[5].id, hotSaw: athletes[1].id },

    // Compétition 5 - Australian Masters
    { userId: users[1].id, competitionId: competitions[4].id, globalChampion: athletes[2].id, hotSaw: athletes[4].id },
    { userId: users[0].id, competitionId: competitions[4].id, globalChampion: athletes[4].id, hotSaw: athletes[7].id },
    { userId: users[2].id, competitionId: competitions[4].id, globalChampion: athletes[2].id, hotSaw: athletes[4].id },
  ];

  for (const pick of picksData) {
    await prisma.globalChampionPick.create({
      data: {
        userId: pick.userId,
        competitionId: pick.competitionId,
        athleteId: pick.globalChampion,
      },
    });

    await prisma.hotSawPick.create({
      data: {
        userId: pick.userId,
        competitionId: pick.competitionId,
        athleteId: pick.hotSaw,
      },
    });
  }

  console.log(`✅ Created ${picksData.length * 2} picks (${picksData.length} global + ${picksData.length} hot saw)`);

  // ==================== COMPETITION RESULTS ====================
  console.log('📊 Creating competition results...');

  // Résultats pour les 4 compétitions passées (indices 8-11)
  const resultsData = [
    {
      competitionId: competitions[8].id, // Championnat du Monde 2024
      championAthleteId: athletes[0].id, // Jason Wynyard
      hotSawWinnerId: athletes[4].id, // Laurence O'Toole
      publishedAt: new Date('2024-11-15T18:00:00Z'),
    },
    {
      competitionId: competitions[9].id, // US Championship 2024
      championAthleteId: athletes[1].id, // Stirling Hart
      hotSawWinnerId: athletes[9].id, // Arden Cogar Jr.
      publishedAt: new Date('2024-09-20T20:00:00Z'),
    },
    {
      competitionId: competitions[10].id, // Australian Open 2024
      championAthleteId: athletes[2].id, // Brayden Meyer
      hotSawWinnerId: athletes[4].id, // Laurence O'Toole
      publishedAt: new Date('2024-08-10T17:00:00Z'),
    },
    {
      competitionId: competitions[11].id, // European Masters 2024
      championAthleteId: athletes[3].id, // Martin Komárek
      hotSawWinnerId: athletes[8].id, // Ferry Svan
      publishedAt: new Date('2024-06-15T18:30:00Z'),
    },
  ];

  for (const result of resultsData) {
    await prisma.competitionResult.create({
      data: result,
    });
  }

  console.log(`✅ Created ${resultsData.length} competition results`);

  console.log('\n🎉 Seeding completed successfully!');
  console.log('\n📝 Summary:');
  console.log(`   - ${athletes.length} athletes with full profiles`);
  console.log(`   - ${competitions.length} competitions (8 futures + 4 past)`);
  console.log(`   - ${users.length} test users`);
  console.log(`   - ${groups.length} groups`);
  console.log(`   - ${picksData.length * 2} picks (pronostics)`);
  console.log(`   - ${resultsData.length} competition results`);
  console.log('\n🔐 Test credentials:');
  console.log('   - test1@betwood.com / password123');
  console.log('   - test2@betwood.com / password123');
  console.log('   - admin@betwood.com / password123');
  console.log('\n🚀 You can now start using the application!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
