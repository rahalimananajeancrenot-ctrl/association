<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Rapport des Droits Annuels - SAVA-U</title>

    <style>
        @page {
            margin: 25px 25px 45px 25px;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            color: #111827;
        }

        .header {
            text-align: center;
            border-bottom: 2px solid #d97706;
            padding-bottom: 12px;
            margin-bottom: 18px;
        }

        .header h2 {
            margin: 0;
            font-size: 22px;
            color: #92400e;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .header p {
            margin: 6px 0 0;
            font-size: 11px;
            color: #6b7280;
        }

        .summary {
            margin-bottom: 15px;
            padding: 10px;
            background-color: #fffbeb;
            border: 1px solid #fde68a;
            border-radius: 6px;
        }

        .summary strong {
            color: #92400e;
        }

        .meta {
            margin-bottom: 15px;
            font-size: 11px;
            color: #6b7280;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
        }

        thead {
            display: table-header-group;
        }

        tr {
            page-break-inside: avoid;
        }

        th {
            background-color: #d97706;
            color: #ffffff;
            padding: 8px 6px;
            border: 1px solid #b45309;
            text-transform: uppercase;
            font-size: 10px;
        }

        td {
            border: 1px solid #d1d5db;
            padding: 7px 6px;
            vertical-align: middle;
            word-wrap: break-word;
        }

        tbody tr:nth-child(even) {
            background-color: #f9fafb;
        }

        .text-center {
            text-align: center;
        }

        .paye {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 12px;
            background-color: #dcfce7;
            color: #166534;
            font-weight: bold;
            font-size: 10px;
        }

        .non-paye {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 12px;
            background-color: #fee2e2;
            color: #991b1b;
            font-weight: bold;
            font-size: 10px;
        }

        .empty {
            text-align: center;
            padding: 18px;
            color: #6b7280;
            font-style: italic;
        }

        .footer {
            position: fixed;
            bottom: -25px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 10px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
            padding-top: 8px;
        }
    </style>
</head>

<body>

    <div class="header">
        <h2>Rapport des Droits Annuels</h2>
        <p>Association SAVA-U</p>
        <p>Document généré le {{ now()->format('d/m/Y à H:i') }}</p>
    </div>

    <div class="summary">
        <strong>Total des membres :</strong> {{ $totalMembres }}
        <br>
        <strong>Filtre appliqué :</strong>
        @if($filtre === 'actifs')
            Membres payés
        @elseif($filtre === 'non_actifs')
            Membres non payés
        @else
            Tous les membres
        @endif
    </div>

    <div class="meta">
        Ce rapport indique les membres ayant payé ou non le droit annuel selon les entrées financières enregistrées.
    </div>

    <table>
        <thead>
            <tr>
                <th style="width: 30%;">Nom du membre</th>
                <th style="width: 30%;">Email</th>
                <th style="width: 25%;">Logement / Adresse</th>
                <th style="width: 15%;">Statut</th>
            </tr>
        </thead>

        <tbody>
            @forelse($membres as $membre)
                <tr>
                    <td>{{ $membre['name'] ?? '-' }}</td>
                    <td>{{ $membre['email'] ?? 'Non renseigné' }}</td>
                    <td>{{ $membre['adresse'] ?? $membre['logement'] ?? 'Non attribué' }}</td>
                    <td class="text-center">
                        @if($membre['paye'])
                            <span class="paye">Payé</span>
                        @else
                            <span class="non-paye">Non payé</span>
                        @endif
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="4" class="empty">
                        Aucun membre trouvé.
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Rapport des droits annuels - SAVA-U - PDF généré automatiquement
    </div>

</body>
</html>