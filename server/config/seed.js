/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Customer from '../api/customer/customer.model';
import User from '../api/user/user.model';
import Systemvalue from '../api/systemvalue/systemvalue.model';
import Vehicle from '../api/vehicle/vehicle.model';
import Inspection from '../api/inspection/inspection.model';
import Review from '../api/review/review.model';

Review.find({}).remove()
  .then(() => {
    Review.create(
      {
    "inspectionId" : "57acc861ba02509575b00ac1",
    "type" : "PREVENTIVE",
    "userReview" : {
        "localId" : "57a2669ac419d84c2af371af",
        "name" : "VANCE JOYNER"
    },
    "vehicle" : {
        "localId" : "575e178bca0cc84848492444",
        "plate" : "VKE422"
    },
    "customer" : {
        "localId" : "575e178aca0cc848484923c7",
        "localName" : "COOTRANSRIO",
        "channelId" : "570bc12fd06265c01f6a83a1",
        "channelName" : "AJUSTEV",
        "distributorId" : "57a4bc5190e443b96229cced",
        "distributorName" : "AJUSTEV MEDELLIN"
    },
    "result" : {
        "images" : [
            "http://placehold.it/32x32",
            "http://placehold.it/32x32"
        ],
        "check" : [
            {
                "categorie" : "Revisión Luces",
                "fields" : [
                    {
                        "name" : "Color luces",
                        "code" : "LUC001",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Luces estacionamiento",
                        "code" : "LUC002",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Luces direccionales",
                        "code" : "LUC003",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Luces bajas y altas",
                        "code" : "LUC004",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Luces medias",
                        "code" : "LUC005",
                        "value" : false,
                        "image" : "http://placehold.it/32x32",
                        "comment" : "Aliqua dolore id occaecat irure laboris ut reprehenderit ea reprehenderit dolore quis laborum. Excepteur nulla enim tempor anim nostrud sit laborum minim commodo sit laboris laborum. Exercitation sint ipsum labore commodo excepteur labore commodo nisi. Excepteur in ullamco pariatur cillum nulla nisi cupidatat ex elit adipisicing minim. Ex laboris ut amet est duis Lorem. Ut labore sit labore minim ut enim fugiat deserunt magna mollit. Esse deserunt commodo culpa magna id incididunt magna.\r\n"
                    },
                    {
                        "name" : "Luces freno",
                        "code" : "LUC006",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Luces reversa",
                        "code" : "LUC007",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Luces interiores",
                        "code" : "LUC008",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    }
                ]
            },
            {
                "categorie" : "Revisión Interior",
                "fields" : [
                    {
                        "name" : "Bocina o pito",
                        "code" : "INT001",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Elementos deteriorados y sueltos",
                        "code" : "INT002",
                        "value" : false,
                        "image" : "http://placehold.it/32x32",
                        "comment" : "Adipisicing deserunt exercitation voluptate aute ut aliquip minim eu nisi dolore consectetur enim. Ullamco exercitation incididunt magna reprehenderit cupidatat fugiat. Irure dolore duis quis id. Ex adipisicing elit nostrud quis do commodo tempor ad aute voluptate in voluptate. Incididunt nisi cupidatat Lorem irure labore culpa fugiat dolore id anim.\r\n"
                    },
                    {
                        "name" : "Cinturones de seguridad",
                        "code" : "INT003",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Salida de emergencia",
                        "code" : "INT004",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Chapas y seguros",
                        "code" : "INT005",
                        "value" : false,
                        "image" : "http://placehold.it/32x32",
                        "comment" : "Anim dolore nisi in duis in reprehenderit esse consectetur ipsum ut pariatur pariatur in officia. Laboris fugiat adipisicing culpa voluptate mollit elit sit anim dolore nisi. Aute amet aliqua et velit voluptate laboris magna quis sunt reprehenderit id qui aliqua nulla.\r\n"
                    },
                    {
                        "name" : "Sillas, carteras y portaequipajes",
                        "code" : "INT006",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Stiker \"Como Conduzco\"",
                        "code" : "INT007",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Dispositivo Control de Velocidad",
                        "code" : "INT008",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Timbre",
                        "code" : "INT009",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    }
                ]
            },
            {
                "categorie" : "Revisión vidrios",
                "fields" : [
                    {
                        "name" : "Espejos retrovisores",
                        "code" : "VID001",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Elevadores vidrios",
                        "code" : "VID002",
                        "value" : false,
                        "image" : "http://placehold.it/32x32",
                        "comment" : "Sint qui velit velit officia quis anim. Deserunt tempor ullamco sunt cillum ipsum esse culpa nulla est nulla tempor sit eu in. Occaecat magna sint ullamco velit labore ut Lorem. Velit eiusmod aliquip ex ut dolore consequat sit cupidatat eiusmod do cillum mollit.\r\n"
                    },
                    {
                        "name" : "Limpia parabrisas",
                        "code" : "VID003",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Parabrisas delantero",
                        "code" : "VID004",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Vidrios móviles",
                        "code" : "VID005",
                        "value" : false,
                        "image" : "http://placehold.it/32x32",
                        "comment" : "Ipsum duis ut ad nulla sint sint pariatur fugiat sunt exercitation dolore aliqua pariatur dolor. Sint mollit velit ad esse nostrud quis nisi eiusmod labore aliquip esse id non ad. Ad nostrud exercitation eiusmod tempor ipsum ullamco excepteur excepteur irure. Dolore aliqua laborum eiusmod consectetur eiusmod officia ad eu qui eu consectetur dolor sint.\r\n"
                    },
                    {
                        "name" : "Vidrios fijos",
                        "code" : "VID006",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Campo visual",
                        "code" : "VID007",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Vidrios transparentes",
                        "code" : "VID008",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    }
                ]
            },
            {
                "categorie" : "Revisión Exterior",
                "fields" : [
                    {
                        "name" : "Carrocería",
                        "code" : "EXT001",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Chasis",
                        "code" : "EXT002",
                        "value" : false,
                        "image" : "http://placehold.it/32x32",
                        "comment" : "Officia qui consequat voluptate ad. Occaecat eu ut amet incididunt proident aute aute veniam deserunt nulla voluptate do in. Est commodo laborum quis irure aute eu velit consectetur elit.\r\n"
                    },
                    {
                        "name" : "Puertas, Baúl y capo",
                        "code" : "EXT003",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Sistema de escape",
                        "code" : "EXT004",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Tercera placa y laterales",
                        "code" : "EXT005",
                        "value" : false,
                        "image" : "http://placehold.it/32x32",
                        "comment" : "Velit ea consequat id voluptate occaecat esse aute commodo qui labore. Mollit elit incididunt id amet aliqua ex officia sunt cillum nisi proident velit. Elit aute adipisicing esse eu ipsum est veniam commodo.\r\n"
                    },
                    {
                        "name" : "Anclajes contenedores",
                        "code" : "EXT006",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Sujeción carrocería",
                        "code" : "EXT007",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Parachoques",
                        "code" : "EXT008",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Roce llantas y guardabarros",
                        "code" : "EXT009",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Peldaños",
                        "code" : "EXT010",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Puertas de carga",
                        "code" : "EXT011",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    }
                ]
            },
            {
                "categorie" : "Revisión Equipo de carretera",
                "fields" : [
                    {
                        "name" : "Botiquín",
                        "code" : "EQU001",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Extintor",
                        "code" : "EQU002",
                        "value" : false,
                        "image" : "http://placehold.it/32x32",
                        "comment" : "Quis enim sint sint duis elit irure irure. Voluptate ullamco excepteur non in ullamco irure irure quis dolor. Excepteur excepteur anim eu dolore veniam magna excepteur tempor laborum. Ea excepteur fugiat ipsum consequat amet cillum non do excepteur tempor fugiat reprehenderit.\r\n"
                    },
                    {
                        "name" : "Martillos fragmentación",
                        "code" : "EQU003",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Cruceta",
                        "code" : "EQU004",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Caja de herramientas",
                        "code" : "EQU005",
                        "value" : false,
                        "image" : "http://placehold.it/32x32",
                        "comment" : "Veniam aliqua deserunt dolore eu do occaecat duis minim aliqua. Adipisicing esse proident consectetur tempor magna occaecat ad irure sit est ipsum eiusmod minim minim. Reprehenderit sunt cillum nisi irure consequat nulla. Incididunt reprehenderit culpa aliquip ex mollit esse duis exercitation. Ad ipsum enim deserunt nisi et labore.\r\n"
                    },
                    {
                        "name" : "Gato",
                        "code" : "EQU006",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Señales",
                        "code" : "EQU007",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Tacos de bloqueo",
                        "code" : "EQU008",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Linterna",
                        "code" : "EQU009",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    }
                ]
            },
            {
                "categorie" : "Revisión Motor",
                "fields" : [
                    {
                        "name" : "Batería",
                        "code" : "MOT001",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Cableado eléctrico",
                        "code" : "MOT002",
                        "value" : false,
                        "image" : "http://placehold.it/32x32",
                        "comment" : "Labore magna reprehenderit irure eiusmod sit sit deserunt Lorem sit dolor deserunt non sint. Do consequat dolore dolore aute est nostrud ut sunt laboris fugiat irure sunt. Veniam nostrud nisi sit minim dolore culpa consequat id pariatur incididunt amet. Ex aliquip pariatur in minim do do labore. Laborum enim laborum proident dolor duis reprehenderit.\r\n"
                    },
                    {
                        "name" : "Fugas aceite",
                        "code" : "MOT003",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Sistema de refrigeración",
                        "code" : "MOT004",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Sistema combustible",
                        "code" : "MOT005",
                        "value" : false,
                        "image" : "http://placehold.it/32x32",
                        "comment" : "Eu labore esse consequat deserunt excepteur in pariatur dolore. Fugiat enim exercitation nostrud excepteur exercitation elit do et et adipisicing non. Est ea nostrud qui sit ea aliquip deserunt et ad quis ut duis.\r\n"
                    }
                ]
            },
            {
                "categorie" : "Revisión Rines y llantas",
                "fields" : [
                    {
                        "name" : "Banda rodamiento",
                        "code" : "LLA001",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Bandas laterales",
                        "code" : "LLA002",
                        "value" : false,
                        "image" : "http://placehold.it/32x32",
                        "comment" : "Magna labore Lorem aute est cillum do do irure minim id. Enim veniam mollit ullamco eu minim commodo tempor ullamco veniam elit est mollit nostrud qui. Laborum sit dolore anim est incididunt ea voluptate fugiat veniam aute nisi ipsum laboris laboris.\r\n"
                    },
                    {
                        "name" : "Deformaciones y fisura rines",
                        "code" : "LLA003",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Labrado",
                        "code" : "LLA004",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Llanta repuesto",
                        "code" : "LLA005",
                        "value" : false,
                        "image" : "http://placehold.it/32x32",
                        "comment" : "Occaecat tempor culpa dolore non sint nulla sit qui labore laborum nostrud. Aliquip eiusmod ipsum labore enim esse sunt do elit laboris culpa mollit ipsum occaecat est. Pariatur aliquip est anim adipisicing pariatur. Fugiat proident ut magna enim excepteur minim reprehenderit.\r\n"
                    },
                    {
                        "name" : "Tuercas y pernos",
                        "code" : "LLA006",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Rines y llantas",
                        "code" : "LLA007",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    }
                ]
            },
            {
                "categorie" : "Revisión Suspensión",
                "fields" : [
                    {
                        "name" : "Barra estabilizadora",
                        "code" : "SUS001",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Brazos suspensión",
                        "code" : "SUS002",
                        "value" : false,
                        "image" : "http://placehold.it/32x32",
                        "comment" : "Irure nostrud minim labore fugiat ea irure fugiat dolor non ullamco veniam deserunt. Est reprehenderit sit aute elit consequat cillum aliquip. Nulla enim aute reprehenderit sit elit. Consequat velit labore sit ea nulla velit.\r\n"
                    },
                    {
                        "name" : "Muelles, resortes, tijeras, espirales, ballestas y barras de torsión",
                        "code" : "SUS003",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Amortiguadores",
                        "code" : "SUS004",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Elementos suspensión",
                        "code" : "SUS005",
                        "value" : false,
                        "image" : "http://placehold.it/32x32",
                        "comment" : "Enim occaecat nostrud exercitation sint eiusmod aliquip quis irure aliquip consequat excepteur tempor nulla. Fugiat veniam dolore cupidatat adipisicing sunt deserunt aliqua ullamco aliquip velit ut. Laboris non minim culpa cillum cupidatat incididunt duis tempor ipsum. Magna eiusmod non exercitation et deserunt sit mollit nostrud sint nisi voluptate incididunt aute officia. Dolor exercitation cillum consequat sint tempor labore duis nisi fugiat anim. Anim mollit nulla dolor anim tempor aute ex pariatur duis veniam pariatur. Proident id enim qui laboris ut ad amet velit anim.\r\n"
                    }
                ]
            },
            {
                "categorie" : "Revisión Frenos",
                "fields" : [
                    {
                        "name" : "Cilindro mando",
                        "code" : "FRE001",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Freno emergencia",
                        "code" : "FRE002",
                        "value" : false,
                        "image" : "http://placehold.it/32x32",
                        "comment" : "Ut nostrud velit Lorem eu ex nisi reprehenderit non labore. Deserunt laborum occaecat cupidatat ex dolore minim fugiat reprehenderit sint magna deserunt elit in. Nisi velit quis amet dolore reprehenderit aliqua pariatur qui consectetur sit fugiat laboris. Sit non ut elit adipisicing veniam incididunt. Nisi exercitation culpa do ea velit sint cupidatat labore reprehenderit qui non eiusmod culpa. Sit elit qui aliquip minim ipsum duis duis nisi. Qui dolore duis voluptate nisi.\r\n"
                    },
                    {
                        "name" : "Fugas y fijación",
                        "code" : "FRE003",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Fundas, cables, guayas y varillas",
                        "code" : "FRE004",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Retorno pedal",
                        "code" : "FRE005",
                        "value" : false,
                        "image" : "http://placehold.it/32x32",
                        "comment" : "Proident do enim velit ad voluptate sint. Magna occaecat laborum aute mollit. Est velit consequat et aliqua reprehenderit sit consequat qui consequat est eu pariatur aliqua proident. Labore est consequat irure deserunt pariatur dolore.\r\n"
                    },
                    {
                        "name" : "Tubos y mangueras",
                        "code" : "FRE006",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Tapa líquido frenos",
                        "code" : "FRE007",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Mordazas y discos",
                        "code" : "FRE008",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Depósitos de presión",
                        "code" : "FRE009",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Servofreno (booster)",
                        "code" : "FRE010",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Nivel líquido frenos",
                        "code" : "FRE011",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Válvula freno aire",
                        "code" : "FRE012",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    }
                ]
            },
            {
                "categorie" : "Revisión Trasmisión",
                "fields" : [
                    {
                        "name" : "Fugas aceite",
                        "code" : "TRA001",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Holguras",
                        "code" : "TRA002",
                        "value" : false,
                        "image" : "http://placehold.it/32x32",
                        "comment" : "Ex anim sunt do consequat in ea cupidatat cupidatat commodo enim. Id esse mollit aliquip cillum in irure mollit laborum elit ea laborum dolor fugiat culpa. Laborum ea incididunt labore laborum pariatur dolore proident exercitation aute laborum duis consectetur in occaecat. Consectetur cillum adipisicing sunt incididunt. Est quis do officia pariatur do dolore occaecat. Pariatur dolore laborum culpa eu do officia nulla laborum reprehenderit nostrud.\r\n"
                    },
                    {
                        "name" : "Juntas cardan",
                        "code" : "TRA003",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Protector cardan",
                        "code" : "TRA004",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    }
                ]
            },
            {
                "categorie" : "Revisión Dirección",
                "fields" : [
                    {
                        "name" : "Juegos y fijación elementos",
                        "code" : "DIR001",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    },
                    {
                        "name" : "Fugas",
                        "code" : "DIR002",
                        "value" : false,
                        "image" : "http://placehold.it/32x32",
                        "comment" : "Aliquip consequat non est ex officia dolor anim elit excepteur veniam sint. Ex nisi sint fugiat eiusmod amet. Exercitation adipisicing ut est culpa duis cillum deserunt adipisicing id duis laboris. Cillum minim laborum officia deserunt ea ullamco occaecat qui mollit elit sunt nulla. Excepteur eiusmod ipsum sunt anim nostrud amet Lorem dolor minim nostrud nostrud nisi cillum. Amet ullamco officia id nulla laboris dolor. Nisi nostrud qui dolor irure esse ipsum do nulla commodo minim cillum laboris eu laborum.\r\n"
                    },
                    {
                        "name" : "Guardapolvos",
                        "code" : "DIR003",
                        "value" : true,
                        "image" : null,
                        "comment" : null
                    }
                ]
            }
        ]
    }
}

    )
    .then(() => {
      console.log('finished populating review');
    });
  });

/*
Review.find({}).remove()
  .then(() => {
    Review.create(
      {
        inspectionId: "57a3935b4d4f82744131cf19",
        vehicle: {
          localId: "57a126a9843f2e461320a371",
          plate: "VEN250"
        },
        customer:{
          localId : "57a126a9843f2e461320a367",
          localName : "ECSTASIA",
          distributorId : "57a126a9843f2e461320a366",
          channelName : "ISOPLEX",
          channelId : "57a126a9843f2e461320a365"
        },
        result: {
          images: [
            "http://placehold.it/32x32",
            "http://placehold.it/32x32"
          ],
          check: [
            {
              localId: "57a25ea4b2287d565036247e",
              code: "CAR001",
              value: "57a2669ac419d84c2af37201",
              image: "http://placehold.it/32x32",
              comment: "Aliqua nulla reprehenderit non exercitation occaecat adipisicing dolor do. Dolore commodo adipisicing sint occaecat quis id culpa. Magna nisi aliquip irure consequat duis officia nisi duis ea sint irure proident esse deserunt. Dolore est sit cupidatat sunt. Qui nulla ad consectetur exercitation proident velit reprehenderit in in pariatur enim sint."
            },
            {
              localId: "57a25ea420e07c31790023e9",
              code: "TPS001",
              value: "57a2669ac419d84c2af37201",
              image: "http://placehold.it/32x32",
              comment: "Enim eu sint deserunt id anim dolor laboris cupidatat voluptate mollit nostrud sint amet culpa. Enim sit adipisicing qui do deserunt ullamco sint officia eiusmod. Lorem anim eu minim amet ad. Magna magna quis minim exercitation cillum. Laborum nisi aliqua mollit mollit reprehenderit consequat ullamco. Veniam duis deserunt sunt reprehenderit cillum voluptate occaecat aliqua ut. Do dolore ad aliquip consequat quis pariatur adipisicing anim."
            },
            {
              localId: "57a25ea4e64c81b6ccf8bcb6",
              code: "PBC001",
              value: "57a2669ac419d84c2af37201",
              image: "http://placehold.it/32x32",
              comment: "Esse nulla labore fugiat sint consectetur anim. Sit aliquip est labore adipisicing velit cupidatat elit pariatur proident adipisicing nostrud ea cillum. Ea ipsum adipisicing elit eiusmod adipisicing quis est do. Tempor excepteur duis veniam magna enim minim ad. Aliquip id mollit minim adipisicing dolor amet dolor ipsum cupidatat minim eiusmod."
            },
            {
              localId: "57a25ea4b0fc4d346ba2c8c5",
              code: "BUM001",
              value: "57a2669ac419d84c2af37201",
              image: "http://placehold.it/32x32",
              comment: "Sint voluptate nostrud labore duis dolore quis anim ea culpa do magna et laboris nulla. Dolor exercitation consequat irure magna magna exercitation duis ad velit. Incididunt quis non proident est nisi magna cupidatat. Consectetur id mollit id minim proident esse laboris voluptate amet eu labore Lorem ex ea. Proident ut eu cupidatat reprehenderit. Eiusmod cupidatat ipsum velit mollit eu officia laboris laboris."
            },
            {
              localId: "57a25ea435f6d5ffb8d0fafc",
              code: "FAB001",
              value: "57a2669ac419d84c2af37201",
              image: "http://placehold.it/32x32",
              comment: "Eu esse commodo consequat cupidatat culpa tempor duis pariatur ad amet ex est irure incididunt. Et reprehenderit incididunt ullamco laborum commodo deserunt mollit. Enim minim mollit sit consectetur elit non anim duis id est amet commodo. Occaecat aliquip eiusmod pariatur est est dolore fugiat non id est. Est pariatur laboris velit culpa consequat occaecat Lorem ullamco. Reprehenderit velit sint quis laborum ad id reprehenderit adipisicing non dolore."
            },
            {
              localId: "57a25ea43e7636eed0d38b8b",
              code: "CHA001",
              value: "57a2669ac419d84c2af37204",
              image: "http://placehold.it/32x32",
              comment: "Cillum sint duis aliqua laborum. Id Lorem aliquip quis sit culpa nostrud. Fugiat aliqua labore amet sint. Ut consectetur dolore voluptate ea et officia sint eiusmod consectetur aute non sit. Quis dolor amet ullamco sit minim esse nulla voluptate sit qui id aliquip. Elit qui labore fugiat qui labore quis. Non laborum officia nulla occaecat ad ipsum id esse."
            }
          ]
        }
      },
      {
        inspectionId: "57a3935c19803b72168444a2",
        vehicle: {
          localId: "57a126a9843f2e461320a377",
          plate: "CIL575"
        },
        customer:{
          localId : "57a126a9843f2e461320a36a",
          localName : "BITENDREX",
          distributorName: "GINKOGENE",
          distributorId : "57a126a9843f2e461320a36c",
          channelName : "AVENETRO",
          channelId : "57a126a9843f2e461320a369"
        },
        result: {
          images: [
            "http://placehold.it/32x32",
            "http://placehold.it/32x32"
          ],
          check: [
            {
              localId: "57a25ea43e7636eed0d38b8b",
              code: "CHA001",
              value: "57a2669ac419d84c2af37201",
              image: "http://placehold.it/32x32",
              comment: "Laboris cillum velit fugiat occaecat. Laborum ex incididunt exercitation nostrud. Ipsum consequat magna velit consectetur deserunt ea eu duis elit est Lorem proident culpa do. Esse quis laborum duis velit aliqua minim duis irure."
            },
            {
              localId: "57a25ea4aa6b4eb5fc3885d0",
              code: "PBC001",
              value: "57a2669ac419d84c2af37204",
              image: "http://placehold.it/32x32",
              comment: "Minim consequat culpa laborum aliquip mollit consectetur magna duis enim. Eu pariatur exercitation ullamco eiusmod non incididunt eu et culpa sint duis do. Commodo dolore id ea quis nulla dolor nulla. Laborum voluptate proident sint minim mollit tempor velit enim commodo. Ad do nulla fugiat sint aliquip anim sit irure est velit labore. Anim ex proident excepteur irure sint ea."
            },
            {
              localId: "57a25ea4e64c81b6ccf8bcb6",
              code: "PBC001",
              value: "57a2669ac419d84c2af37204",
              image: "http://placehold.it/32x32",
              comment: "Ipsum nisi mollit irure minim aute. Et eiusmod dolor non amet. Excepteur aute incididunt fugiat exercitation duis labore eu mollit. Occaecat non laboris incididunt fugiat est cupidatat officia ex fugiat nisi. Esse pariatur eiusmod id duis sunt proident Lorem exercitation duis reprehenderit id voluptate."
            },
            {
              localId: "57a25ea4a7d3f73b894fa256",
              code: "RBF001",
              value: "57a2669ac419d84c2af37204",
              image: "http://placehold.it/32x32",
              comment: "Velit exercitation qui sunt commodo adipisicing dolore veniam ea nisi ut in do occaecat. Voluptate elit ut do ullamco duis ea ea nostrud magna quis esse commodo. Id ullamco proident do eu tempor veniam sint. Commodo minim irure voluptate nisi irure elit ex sit deserunt laboris reprehenderit laborum ullamco. Ipsum reprehenderit cillum nostrud mollit deserunt eu irure consectetur elit esse magna ex ullamco duis. Nostrud in duis ex in consequat qui eu."
            },
            {
              localId: "57a25ea420e07c31790023e9",
              code: "TPS001",
              value: "57a2669ac419d84c2af37201",
              image: "http://placehold.it/32x32",
              comment: "Nostrud nostrud anim deserunt fugiat. Aliqua proident sunt laborum incididunt incididunt eiusmod do occaecat ut dolor elit nostrud. Sint deserunt irure magna enim nostrud et culpa est enim magna do laboris amet do. Nostrud sint duis ipsum ex. Lorem esse ipsum eiusmod nulla sunt irure ex non ea."
            },
            {
              localId: "57a25ea435f6d5ffb8d0fafc",
              code: "FAB001",
              value: "57a2669ac419d84c2af37201",
              image: "http://placehold.it/32x32",
              comment: "Magna in amet irure esse proident. Est culpa esse qui eu consectetur nulla labore cillum duis consectetur minim. Ipsum veniam do ad pariatur enim."
            },
            {
              localId: "57a25ea4e3f367c4aafe4518",
              code: "PED001",
              value: "57a2669ac419d84c2af37201",
              image: "http://placehold.it/32x32",
              comment: "Voluptate velit proident nulla mollit adipisicing labore proident non. Aliquip consequat exercitation dolor cillum cillum sint adipisicing aliqua amet Lorem voluptate laborum. Commodo qui qui consequat ea nulla fugiat laborum."
            }
          ]
        }
      }
    )
    .then(() => {
      console.log('finished populating review');
    });
  });

  User.find({}).remove()
    .then(() => {
      User.create(
      {
        provider: 'local',
        name: "ANNABELLE BOLTON",
        email: "sapco@example.com",
        role: "admin",
        password: "abc123",
        customer : {
          localId : "57a21bdca61de23136d1741f",
          localName : "SAPCO",
          channelId : null,
          channelName : null,
          distributorId : null,
          distributorName : null
        },
        additionalData: {
          address: "534 Maujer Street, Ebro, North Dakota, 5955",
          phoneNumber: "+1 (846) 411-3925",
          cellPhoneNumber: "+1 (864) 498-3358",
          country: "COLOMBIA",
          city: "MEDELLIN",
          language: "es",
          timeZone: "America/Bogota",
          position: "BIG BOSS",
          picture: "http://placehold.it/32x32"
        }
      },
      {
        provider: 'local',
        name: "STELLA HORTON",
        email: "cda@example.com", //CDA MAYOR
        role: "cda",
        password: "abc123",
        customer: {
          localId : "570bc12fd06265c01f6a83a1",
          localName : "AJUSTEV",
          channelId : "570bc12fd06265c01f6a83a1",
          channelName : "AJUSTEV",
          distributorId : null,
          distributorName : null
        },
        additionalData: {
          address: "263 Bainbridge Street, Layhill, Iowa, 5019",
          phoneNumber: "+1 (878) 430-3157",
          cellPhoneNumber: "+1 (893) 407-2556",
          country: "COLOMBIA",
          city: "MEDELLIN",
          language: "es",
          timeZone: "America/Bogota",
          position: "CDA LEAD",
          picture: "http://placehold.it/32x32"
        }
      },
      {
        provider: 'local',
        name: "PAMELA HORTON",
        email: "sede@example.com", // sede
        role: "sede",
        password: "abc123",
        customer: {
          localId : "57a4bc5190e443b96229cced",
          localName : "AJUSTEV MEDELLIN",
          channelId : "570bc12fd06265c01f6a83a1",
          channelName : "AJUSTEV",
          distributorId : "57a4bc5190e443b96229cced",
          distributorName : "AJUSTEV MEDELLIN"
        },
        additionalData: {
          address: "263 Bainbridge Street, Layhill, Iowa, 5019",
          phoneNumber: "+1 (878) 430-3157",
          cellPhoneNumber: "+1 (893) 407-2556",
          country: "COLOMBIA",
          city: "MEDELLIN",
          language: "es",
          timeZone: "America/Bogota",
          position: "CDA LEAD",
          picture: "http://placehold.it/32x32"
        }
      },
      {
        provider: 'local',
        name: "MORRISON PAYNE",
        email: "flota@example.com", //cliente de la sede del cda
        role: "flota",
        password: "abc123",
        customer: {
          localId : "575e178aca0cc848484923c4",
          localName : "AUTONORTE S.A",
          channelId : "570bc12fd06265c01f6a83a1",
          channelName : "AJUSTEV",
          distributorId : "57a4bc5190e443b96229cced",
          distributorName : "AJUSTEV MEDELLIN"
        },
        additionalData: {
          address: "177 Moffat Street, Dola, Arkansas, 2296",
          phoneNumber: "+1 (913) 582-2407",
          cellPhoneNumber: "+1 (812) 530-3365",
          country: "COLOMBIA",
          city: "MEDELLIN",
          language: "es",
          timeZone: "America/Bogota",
          position: "FLOTA LEAD",
          picture: "http://placehold.it/32x32"
        }
      },
      {
        provider: 'local',
        name: "VANCE JOYNER",
        email: "tecnico@example.com",
        role: "tecnico",
        password: "abc123",
        customer: {
          localId : "570bc12fd06265c01f6a83a1",
          localName : "AJUSTEV",
          channelId : "570bc12fd06265c01f6a83a1",
          channelName : "AJUSTEV",
          distributorId : null,
          distributorName : null
        },
        additionalData: {
          address: "579 Fiske Place, Klagetoh, Montana, 3101",
          phoneNumber: "+1 (908) 450-2080",
          cellPhoneNumber: "+1 (852) 497-2366",
          country: "COLOMBIA",
          city: "MEDELLIN",
          language: "es",
          timeZone: "America/Bogota",
          position: "TECNICO ENGI",
          picture: "http://placehold.it/32x32"
        }
      }
    )
      .then(() => {
        console.log('finished populating users');
      });
    });

Inspection.find({}).remove()
  .then(() => {
    Inspection.create(
      {
        name : "REVISION PREVENTIVA",
        customer : {
          localId : "57a126a9843f2e461320a365",
          localName : "ISOPLEX"
        },
        data : {
          categorie : [
            {
              language : "es",
              description : "EXTERIOR"
            },
            {
              language : "en",
              description : "EXTERIOR"
            }
          ],
          items : [
            {
              _id : "57a25ea4b2287d565036247e",
              name : [
                {
                  language : "es",
                  description : "Carroceria"
                },
                {
                  language : "en",
                  description : "Bodywork"
                }
              ],
              code : "CAR001",
              type : "CHECK",
              isRequired : true,
              values : [
                {
                  name : [
                    {
                      language : "es",
                      description : "BUENO"
                    },
                    {
                      language : "en",
                      description : "GOOD"
                    }
                  ]
                },
                {
                  name : [
                    {
                      language : "es",
                      description : "MALO"
                    },
                    {
                      language : "en",
                      description : "BAD"
                    }
                  ]
                }
              ]
            },
            {
              _id : "57a25ea43e7636eed0d38b8b",
              name : [
                {
                  language : "es",
                  description : "Chasis"
                },
                {
                  language : "en",
                  description : "Chassis"
                }
              ],
              code : "CHA001",
              type : "CHECK",
              isRequired : true,
              values : [
                {
                  name : [
                    {
                      language : "es",
                      description : "BUENO"
                    },
                    {
                      language : "en",
                      description : "GOOD"
                    }
                  ]
                },
                {
                  name : [
                    {
                      language : "es",
                      description : "MALO"
                    },
                    {
                      language : "en",
                      description : "BAD"
                    }
                  ]
                }
              ]
            },
            {
              _id : "57a25ea4aa6b4eb5fc3885d0",
              name : [
                {
                  language : "es",
                  description : "Puertas, baul y capo"
                },
                {
                  language : "en",
                  description : "Doors, trunk and hood"
                }
              ],
              code : "PBC001",
              type : "CHECK",
              isRequired : true,
              values : [
                {
                  name : [
                    {
                      language : "es",
                      description : "BUENO"
                    },
                    {
                      language : "en",
                      description : "GOOD"
                    }
                  ]
                },
                {
                  name : [
                    {
                      language : "es",
                      description : "MALO"
                    },
                    {
                      language : "en",
                      description : "BAD"
                    }
                  ]
                }
              ]
            },
            {
              _id : "57a25ea4e64c81b6ccf8bcb6",
              name : [
                {
                  language : "es",
                  description : "Puertas, baul y capo"
                },
                {
                  language : "en",
                  description : "Doors, trunk and hood"
                }
              ],
              code : "PBC001",
              type : "CHECK",
              isRequired : true,
              values : [
                {
                  name : [
                    {
                      language : "es",
                      description : "BUENO"
                    },
                    {
                      language : "en",
                      description : "GOOD"
                    }
                  ]
                },
                {
                  name : [
                    {
                      language : "es",
                      description : "MALO"
                    },
                    {
                      language : "en",
                      description : "BAD"
                    }
                  ]
                }
              ]
            },
            {
              _id : "57a25ea4761913bc77d467ab",
              name : [
                {
                  language : "es",
                  description : "Sistema de escape"
                },
                {
                  language : "en",
                  description : "Exhaust system"
                }
              ],
              code : "SES001",
              type : "CHECK",
              isRequired : true,
              values : [
                {
                  name : [
                    {
                      language : "es",
                      description : "BUENO"
                    },
                    {
                      language : "en",
                      description : "GOOD"
                    }
                  ]
                },
                {
                  name : [
                    {
                      language : "es",
                      description : "MALO"
                    },
                    {
                      language : "en",
                      description : "BAD"
                    }
                  ]
                }
              ]
            },
            {
              _id : "57a25ea420e07c31790023e9",
              name : [
                {
                  language : "es",
                  description : "Tercera placa y laterales"
                },
                {
                  language : "en",
                  description : "Third plate and side"
                }
              ],
              code : "TPS001",
              type : "CHECK",
              isRequired : true,
              values : [
                {
                  name : [
                    {
                      language : "es",
                      description : "BUENO"
                    },
                    {
                      language : "en",
                      description : "GOOD"
                    }
                  ]
                },
                {
                  name : [
                    {
                      language : "es",
                      description : "MALO"
                    },
                    {
                      language : "en",
                      description : "BAD"
                    }
                  ]
                }
              ]
            },
            {
              _id : "57a25ea47a26abe06d326520",
              name : [
                {
                  language : "es",
                  description : "Anclajes contenedores"
                },
                {
                  language : "en",
                  description : "Anchors containers"
                }
              ],
              code : "ACT001",
              type : "CHECK",
              isRequired : true,
              values : [
                {
                  name : [
                    {
                      language : "es",
                      description : "BUENO"
                    },
                    {
                      language : "en",
                      description : "GOOD"
                    }
                  ]
                },
                {
                  name : [
                    {
                      language : "es",
                      description : "MALO"
                    },
                    {
                      language : "en",
                      description : "BAD"
                    }
                  ]
                }
              ]
            },
            {
              _id : "57a25ea435f6d5ffb8d0fafc",
              name : [
                {
                  language : "es",
                  description : "Sujeccion de carroceria"
                },
                {
                  language : "en",
                  description : "Fastening body"
                }
              ],
              code : "FAB001",
              type : "CHECK",
              isRequired : true,
              values : [
                {
                  name : [
                    {
                      language : "es",
                      description : "BUENO"
                    },
                    {
                      language : "en",
                      description : "GOOD"
                    }
                  ]
                },
                {
                  name : [
                    {
                      language : "es",
                      description : "MALO"
                    },
                    {
                      language : "en",
                      description : "BAD"
                    }
                  ]
                }
              ]
            },
            {
              _id : "57a25ea4b0fc4d346ba2c8c5",
              name : [
                {
                  language : "es",
                  description : "Parachoques"
                },
                {
                  language : "en",
                  description : "Bumper"
                }
              ],
              code : "BUM001",
              type : "CHECK",
              isRequired : true,
              values : [
                {
                  name : [
                    {
                      language : "es",
                      description : "BUENO"
                    },
                    {
                      language : "en",
                      description : "GOOD"
                    }
                  ]
                },
                {
                  name : [
                    {
                      language : "es",
                      description : "MALO"
                    },
                    {
                      language : "en",
                      description : "BAD"
                    }
                  ]
                }
              ]
            },
            {
              _id : "57a25ea4a7d3f73b894fa256",
              name : [
                {
                  language : "es",
                  description : "Roce llantas y guardabarros"
                },
                {
                  language : "en",
                  description : "Rubbing tires and fenders"
                }
              ],
              code : "RBF001",
              type : "CHECK",
              isRequired : true,
              values : [
                {
                  name : [
                    {
                      language : "es",
                      description : "BUENO"
                    },
                    {
                      language : "en",
                      description : "GOOD"
                    }
                  ]
                },
                {
                  name : [
                    {
                      language : "es",
                      description : "MALO"
                    },
                    {
                      language : "en",
                      description : "BAD"
                    }
                  ]
                }
              ]
            },
            {
              _id : "57a25ea4e3f367c4aafe4518",
              name : [
                {
                  language : "es",
                  description : "Peldaños"
                },
                {
                  language : "en",
                  description : "Steps"
                }
              ],
              code : "PED001",
              type : "CHECK",
              isRequired : true,
              values : [
                {
                  name : [
                    {
                      language : "es",
                      description : "BUENO"
                    },
                    {
                      language : "en",
                      description : "GOOD"
                    }
                  ]
                },
                {
                  name : [
                    {
                      language : "es",
                      description : "MALO"
                    },
                    {
                      language : "en",
                      description : "BAD"
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    );
  });

Systemvalue.find({}).remove()
  .then(() => {
    Systemvalue.create({
      group: 'cities',
      values:[
        {
            "name" : "MEDELLÍN",
            "id" : "56c6104dec6fc8b803bbbec7"
        },
        {
            "name" : "CÚCUTA",
            "id" : "56c6104dec6fc8b803bbbec8"
        },
        {
            "name" : "BUCARAMANGA",
            "id" : "56c6104dec6fc8b803bbbec9"
        },
        {
            "name" : "BOGOTÁ",
            "id" : "56c6104dec6fc8b803bbbeca"
        },
        {
            "name" : "CALI",
            "id" : "56c6104dec6fc8b803bbbecb"
        },
        {
            "name" : "ENVIGADO",
            "id" : "56c6104dec6fc8b803bbbecc"
        },
        {
            "name" : "SABANETA",
            "id" : "56c6104dec6fc8b803bbbecd"
        },
        {
            "name" : "ITAGÜI",
            "id" : "56c6104dec6fc8b803bbbece"
        },
        {
            "name" : "RIONEGRO",
            "id" : "56c6104dec6fc8b803bbbecf"
        },
        {
            "name" : "BELLO",
            "id" : "56c6104dec6fc8b803bbbed0"
        },
        {
            "name" : "MANIZALES",
            "id" : "56c6104dec6fc8b803bbbed1"
        },
        {
            "name" : "BARRANQUILLA",
            "id" : "56c6104dec6fc8b803bbbed2"
        },
        {
            "name" : "CARTAGENA",
            "id" : "56c6104dec6fc8b803bbbed3"
        },
        {
            "name" : "SANTA MARTA",
            "id" : "56c6104dec6fc8b803bbbed4"
        },
        {
            "name" : "PEREIRA",
            "id" : "56c6104dec6fc8b803bbbed5"
        },
        {
            "name" : "DEFAULT",
            "id" : "56c6104dec6fc8b803bbbed6"
        },
        {
            "name" : "ARMENIA",
            "id" : "56c6104dec6fc8b803bbbed7"
        },
        {
            "name" : "TUNJA",
            "id" : "56c6104dec6fc8b803bbbed8"
        },
        {
            "name" : "YOPAL",
            "id" : "56c6104dec6fc8b803bbbed9"
        },
        {
            "name" : "LETICIA",
            "id" : "56c6104dec6fc8b803bbbeda"
        },
        {
            "name" : "ARAUCA",
            "id" : "56c6104dec6fc8b803bbbedb"
        },
        {
            "name" : "NEIVA",
            "id" : "56c6104dec6fc8b803bbbedc"
        },
        {
            "name" : "FLORENCIA",
            "id" : "56c6104dec6fc8b803bbbedd"
        },
        {
            "name" : "POPAYÁN",
            "id" : "56c6104dec6fc8b803bbbede"
        },
        {
            "name" : "VALLEDUPAR",
            "id" : "56c6104dec6fc8b803bbbedf"
        },
        {
            "name" : "QUIBDÓ",
            "id" : "56c6104dec6fc8b803bbbee0"
        },
        {
            "name" : "MONTERÍA",
            "id" : "56c6104dec6fc8b803bbbee1"
        },
        {
            "name" : "PUERTO INÍRIDA",
            "id" : "56c6104dec6fc8b803bbbee2"
        },
        {
            "name" : "SAN JOSÉ DEL GUAVIARE",
            "id" : "56c6104dec6fc8b803bbbee3"
        },
        {
            "name" : "RIOHACHA",
            "id" : "56c6104dec6fc8b803bbbee4"
        },
        {
            "name" : "VILLAVICENCIO",
            "id" : "56c6104dec6fc8b803bbbee5"
        },
        {
            "name" : "PASTO",
            "id" : "56c6104dec6fc8b803bbbee6"
        },
        {
            "name" : "MOCOA",
            "id" : "56c6104dec6fc8b803bbbee7"
        },
        {
            "name" : "SAN ANDRÉS",
            "id" : "56c6104dec6fc8b803bbbee8"
        },
        {
            "name" : "SINCELEJO",
            "id" : "56c6104dec6fc8b803bbbee9"
        },
        {
            "name" : "IBAGUÉ",
            "id" : "56c6104dec6fc8b803bbbeea"
        },
        {
            "name" : "MITÚ",
            "id" : "56c6104dec6fc8b803bbbeeb"
        },
        {
            "name" : "PUERTO CARREÑO",
            "id" : "56c6104dec6fc8b803bbbeec"
        },
        {
            "name" : "OTRA",
            "id" : "56c6104dec6fc8b803bbbeed"
        }
      ]
    }, {
      group: 'roles',
      values: [
        {
            "id" : "56c4ba34df0a1efe1fa04bb9",
            "name" : "tecnico"
        },
        {
            "id" : "56c4ba0adf0a1efe1fa04bb8",
            "name" : "admin"
        },
        {
            "id" : "56c4ba0adf0a1efe1fa04bb8",
            "name" : "adminCliente"
        },
        {
            "id" : "5762d469d9940d1685ba5443",
            "name" : "adminFlota"
        }
      ]
    })
    .then(() => {
      console.log('finished populating systemvalue');
    });
  });

Vehicle.find({}).remove()
  .then(() => {
    Vehicle.create({
    "type": {
      "id": "5798e80f697fe118f8914afd",
      "name": "CAMION"
    },
    "image": "http://placehold.it/32x32",
    "vehicleData": {
      "model": 2015,
      "brand": "MAZDA",
      "cyl": 4798,
      "color": "GREEN",
      "bodyWork": "CERRADA",
      "service": "PARTICULAR",
      "classN": "CAMPERO",
      "fuel": "ACPM",
      "motor": 149631267,
      "serie": 576544212,
      "chassis": 694284278,
      "owner": {
        "fullName": "Earline Brewer",
        "identification": {
          "number": 854560139,
          "origin": "CO"
        }
      }
    },
    "plate": {
      "number": "VEN250",
      "origin": "CO"
    },
    "customer" :{
      "localId": "579ac9b53a47535948ce3a37",
      "localName": "UXMOX",
      "channelId": "579ac9b512844590e4a14dfc",
      "channelName": "MANGELICA",
      "distributorId": "579ac9b53322beb4077bc3b1",
      "distributorName": "MIXERS"
    },
    "documents": [
      {
        "type": "SOAT",
        "number": 350057490,
        "expeditionDate": "Wednesday, September 2, 2015 5:18 PM",
        "expirationDate": "Tuesday, January 5, 2016 3:31 AM",
        "diagnosticsCenter": "ISOSPHERE",
        "insuranceCompany": "APPLIDEC",
        "officeCode": 1169,
        "cost": 3580381,
        "active": true
      },
      {
        "type": "SOAT",
        "number": 628365376,
        "expeditionDate": "Sunday, June 7, 2015 11:13 PM",
        "expirationDate": "Thursday, October 30, 2014 2:29 AM",
        "diagnosticsCenter": "BUNGA",
        "insuranceCompany": "VENOFLEX",
        "officeCode": 8462,
        "cost": 2929182,
        "active": true
      }
    ]
  },
  {
    "type": {
      "id": "5798e80ff6d3c55895766480",
      "name": "CAMION"
    },
    "image": "http://placehold.it/32x32",
    "vehicleData": {
      "model": 2010,
      "brand": "AUDI",
      "cyl": 1400,
      "color": "BLUE",
      "bodyWork": "CERRADA",
      "service": "PARTICULAR",
      "classN": "CAMPERO",
      "fuel": "CORRIENTE",
      "motor": 837201900,
      "serie": 620813284,
      "chassis": 321282091,
      "owner": {
        "fullName": "Juana Walker",
        "identification": {
          "number": 122719635,
          "origin": "CO"
        }
      }
    },
    "plate": {
      "number": "AD294",
      "origin": "CO"
    },
    "customer" :{
      "localId": "579ac9b53a47535948ce3a37",
      "localName": "UXMOX",
      "channelId": "579ac9b512844590e4a14dfc",
      "channelName": "MANGELICA",
      "distributorId": "579ac9b53322beb4077bc3b1",
      "distributorName": "MIXERS"
    },
    "documents": [
      {
        "type": "SOAT",
        "number": 832000731,
        "expeditionDate": "Sunday, April 17, 2016 4:34 AM",
        "expirationDate": "Sunday, June 12, 2016 7:44 AM",
        "diagnosticsCenter": "GALLAXIA",
        "insuranceCompany": "MEGALL",
        "officeCode": 6902,
        "cost": 9558985,
        "active": true
      },
      {
        "type": "SOAT",
        "number": 496544380,
        "expeditionDate": "Friday, June 12, 2015 12:21 AM",
        "expirationDate": "Thursday, April 28, 2016 7:03 PM",
        "diagnosticsCenter": "CEPRENE",
        "insuranceCompany": "ZISIS",
        "officeCode": 7303,
        "cost": 3402536,
        "active": true
      }
    ]
  },
  {
    "type": {
      "id": "5798e80f45d18a808b8d74a8",
      "name": "CAMPERO"
    },
    "image": "http://placehold.it/32x32",
    "vehicleData": {
      "model": 2008,
      "brand": "RENAULT",
      "cyl": 1154,
      "color": "BLUE",
      "bodyWork": "CERRADA",
      "service": "PUBLICO",
      "classN": "BUS",
      "fuel": "DIESEL",
      "motor": 447816281,
      "serie": 538240362,
      "chassis": 818026582,
      "owner": {
        "fullName": "Cline Roberson",
        "identification": {
          "number": 500950401,
          "origin": "CO"
        }
      }
    },
    "plate": {
      "number": "CIL575",
      "origin": "CO"
    },
    "customer" :{
      "localId": "579ac9b53a47535458ce3a37",
      "localName": "BITENDREX",
      "channelId": "579ac9b5ea333dbc13f0470c",
      "channelName": "ULTRASURE",
      "distributorId": "579ac9b55a176a8a0db15d89",
      "distributorName": "ZIPAK"
    },
    "documents": [
      {
        "type": "SOAT",
        "number": 163501528,
        "expeditionDate": "Friday, October 2, 2015 11:21 PM",
        "expirationDate": "Saturday, July 11, 2015 4:45 PM",
        "diagnosticsCenter": "PLASTO",
        "insuranceCompany": "STOCKPOST",
        "officeCode": 7112,
        "cost": 5497591,
        "active": true
      },
      {
        "type": "RTM",
        "number": 423617205,
        "expeditionDate": "Monday, December 14, 2015 2:31 AM",
        "expirationDate": "Monday, February 29, 2016 2:09 AM",
        "diagnosticsCenter": "ZILLAR",
        "insuranceCompany": "SNACKTION",
        "officeCode": 6557,
        "cost": 5630710,
        "active": true
      }
    ]
  },
  {
    "type": {
      "id": "5798e80fa8e2270b2dc338da",
      "name": "CAMPERO"
    },
    "image": "http://placehold.it/32x32",
    "vehicleData": {
      "model": 2010,
      "brand": "AUDI",
      "cyl": 2289,
      "color": "GREEN",
      "bodyWork": "OTRA",
      "service": "PARTICULAR",
      "classN": "BUS",
      "fuel": "CORRIENTE",
      "motor": 368597708,
      "serie": 265281011,
      "chassis": 171807928,
      "owner": {
        "fullName": "Brigitte Alvarado",
        "identification": {
          "number": 288303675,
          "origin": "CO"
        }
      }
    },
    "plate": {
      "number": "SIT854",
      "origin": "CO"
    },
    "customer" :{
      "localId": "579ac9b53a47535458ce3a37",
      "localName": "BITENDREX",
      "channelId": "579ac9b5ea333dbc13f0470c",
      "channelName": "ULTRASURE",
      "distributorId": "579ac9b55a176a8a0db15d89",
      "distributorName": "ZIPAK"
    },
    "documents": [
      {
        "type": "RTM",
        "number": 288146731,
        "expeditionDate": "Friday, September 12, 2014 7:11 AM",
        "expirationDate": "Friday, January 24, 2014 8:46 PM",
        "diagnosticsCenter": "REALYSIS",
        "insuranceCompany": "NURALI",
        "officeCode": 6364,
        "cost": 9838526,
        "active": false
      },
      {
        "type": "SOAT",
        "number": 309055253,
        "expeditionDate": "Sunday, March 16, 2014 9:11 PM",
        "expirationDate": "Wednesday, April 1, 2015 9:48 AM",
        "diagnosticsCenter": "NITRACYR",
        "insuranceCompany": "LOCAZONE",
        "officeCode": 9530,
        "cost": 3509796,
        "active": true
      }
    ]
  },
  {
    "type": {
      "id": "5798e80f621cb7fa10dd2de0",
      "name": "CAMPERO"
    },
    "image": "http://placehold.it/32x32",
    "vehicleData": {
      "model": 1984,
      "brand": "MAZDA",
      "cyl": 3670,
      "color": "GREEN",
      "bodyWork": "OTRA",
      "service": "PARTICULAR",
      "classN": "CAMION",
      "fuel": "CORRIENTE",
      "motor": 199752472,
      "serie": 467898927,
      "chassis": 282424259,
      "owner": {
        "fullName": "Rush Bryant",
        "identification": {
          "number": 723751051,
          "origin": "CO"
        }
      }
    },
    "plate": {
      "number": "EA343",
      "origin": "CO"
    },
    "customer" :{
      "localId": "579ac9b53a47535458ce3a37",
      "localName": "BITENDREX",
      "channelId": "579ac9b5ea333dbc13f0470c",
      "channelName": "ULTRASURE",
      "distributorId": "579ac9b55a176a8a0db15d89",
      "distributorName": "ZIPAK"
    },
    "documents": [
      {
        "type": "SOAT",
        "number": 636370222,
        "expeditionDate": "Saturday, March 7, 2015 10:41 PM",
        "expirationDate": "Thursday, April 7, 2016 8:13 AM",
        "diagnosticsCenter": "ZBOO",
        "insuranceCompany": "COMDOM",
        "officeCode": 3452,
        "cost": 3867178,
        "active": false
      },
      {
        "type": "RTM",
        "number": 162796707,
        "expeditionDate": "Friday, December 12, 2014 2:45 AM",
        "expirationDate": "Saturday, January 4, 2014 1:24 PM",
        "diagnosticsCenter": "XANIDE",
        "insuranceCompany": "ELEMANTRA",
        "officeCode": 3257,
        "cost": 3767976,
        "active": true
      }
    ]
  })
    .then(() => {
      console.log('finished populating Vehicle');
    });
  });

Customer.find({}).remove()
  .then(() => {
    Customer.create({
    "name": "ISOPLEX",
    "type": {
      "id": "579ac9b51d3ddcfec8b5191d",
      "name": "CHANNEL"
    },
    "nit": {
      "number": 741601953,
      "origin": "CO"
    },
    "channelId": "579ac9b51d3ddcfec8b5191d",
    "channelName": "ISOPLEX",
    "distributorId": null,
    "distributorName": "",
    "active": true
  },
  {
    "name": "ENTALITY",
    "type": {
      "id": "579ac9b5763c32774f8be062",
      "name": "DISTRIBUTOR"
    },
    "nit": {
      "number": 517191694,
      "origin": "CO"
    },
    "channelId": "579ac9b51d3ddcfec8b5191d",
    "channelName": "ISOPLEX",
    "distributorId": "579ac9b53a47535948ce3a37",
    "distributorName": "ENTALITY",
    "active": true
  },
  {
    "name": "ECSTASIA",
    "type": {
      "id": "579ac9b5e7013873e0e02c01",
      "name": "CLIENT"
    },
    "nit": {
      "number": 244941697,
      "origin": "CO"
    },
    "channelId": "579ac9b51d3ddcfec8b5191d",
    "channelName": "ISOPLEX",
    "distributorId": "579ac9b53a47535948ce3a37",
    "distributorName": "ENTALITY",
    "active": true
  },
  {
    "name": "UXMOX",
    "type": {
      "id": "579ac9b5e7013873e0e02c01",
      "name": "CLIENT"
    },
    "nit": {
      "number": 401906606,
      "origin": "CO"
    },
    "channelId": "579ac9b512844590e4a14dfc",
    "channelName": "MANGELICA",
    "distributorId": "579ac9b53322beb4077bc3b1",
    "distributorName": "MIXERS",
    "active": true
  },
  {
    "name": "AVENETRO",
    "type": {
      "id": "579ac9b51d3ddcfec8b5191d",
      "name": "CHANNEL"
    },
    "nit": {
      "number": 585018276,
      "origin": "CO"
    },
    "channelId": "579ac9b537f5d3d56db25004",
    "channelName": "BIOLIVE",
    "distributorId": "579ac9b537734dba8fed3c24",
    "distributorName": "ZYTRAC",
    "active": false
  },
  {
    "name": "BITENDREX",
    "type": {
      "id": "579ac9b5e7013873e0e02c01",
      "name": "CLIENT"
    },
    "nit": {
      "number": 332680117,
      "origin": "CO"
    },
    "channelId": "579ac9b5ea333dbc13f0470c",
    "channelName": "ULTRASURE",
    "distributorId": "579ac9b55a176a8a0db15d89",
    "distributorName": "ZIPAK",
    "active": true
  },
  {
    "name": "UTARA",
    "type": {
      "id": "579ac9b51d3ddcfec8b5191d",
      "name": "CHANNEL"
    },
    "nit": {
      "number": 798305412,
      "origin": "CO"
    },
    "channelId": "579ac9b5256eb974fef36cbd",
    "channelName": "ROCKLOGIC",
    "distributorId": null,
    "distributorName": "",
    "active": true
  },
  {
    "name": "GINKOGENE",
    "type": {
      "id": "579ac9b5763c32774f8be062",
      "name": "DISTRIBUTOR"
    },
    "nit": {
      "number": 740302072,
      "origin": "CO"
    },
    "channelId": "579ac9b54b9203d50ce7459a",
    "channelName": "UTARA",
    "distributorId": "579ac9b57bcbb42106ed294e",
    "distributorName": "GINKOGENE",
    "active": true
  })
    .then(() => {
      console.log('finished populating Customer');
    });
  });

*/
