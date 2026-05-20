<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Attribution de logements</title>

    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            color: #1f2937;
            margin: 25px;
            background: #ffffff;
        }

        .header {
            text-align: center;
            border-bottom: 3px solid #16a34a;
            padding-bottom: 14px;
            margin-bottom: 25px;
        }

        .header h2 {
            margin: 0;
            color: #166534;
            font-size: 24px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .header p {
            margin-top: 6px;
            color: #6b7280;
            font-size: 11px;
        }

        .attribution-card {
            border: 1px solid #d1d5db;
            border-radius: 8px;
            margin-bottom: 18px;
            overflow: hidden;
            page-break-inside: avoid;
        }

        .card-header {
            background: #f0fdf4;
            border-bottom: 1px solid #bbf7d0;
            padding: 10px 12px;
        }

        .logement-title {
            color: #166534;
            font-size: 15px;
            font-weight: bold;
            margin: 0;
        }

        .date {
            color: #6b7280;
            font-size: 11px;
            margin-top: 4px;
        }

        .card-body {
            padding: 12px;
        }

        .members-title {
            font-weight: bold;
            margin-bottom: 8px;
            color: #374151;
        }

        .members-list {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        .members-list li {
            padding: 7px 10px;
            margin-bottom: 6px;
            background: #f9fafb;
            border-left: 4px solid #16a34a;
            border-radius: 4px;
        }

        .member-number {
            font-weight: bold;
            color: #166534;
            margin-right: 6px;
        }

        .empty {
            padding: 18px;
            text-align: center;
            color: #6b7280;
            font-style: italic;
            border: 1px dashed #d1d5db;
            border-radius: 8px;
            background: #f9fafb;
        }

        .footer {
            margin-top: 25px;
            padding-top: 10px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            font-size: 10px;
            color: #6b7280;
        }
    </style>
</head>

<body>

    <div class="header">
        <h2>Attribution de logements</h2>
        <p>Document généré le {{ now()->format('d/m/Y à H:i') }}</p>
    </div>

    @forelse($attributions as $attr)
        <div class="attribution-card">
            <div class="card-header">
                <p class="logement-title">
                    Logement : {{ $attr['logement_name'] ?? 'Non renseigné' }}
                </p>

                <p class="date">
                    Attribué le :
                    {{ isset($attr['created_at']) ? \Carbon\Carbon::parse($attr['created_at'])->format('d/m/Y') : now()->format('d/m/Y') }}
                </p>
            </div>

            <div class="card-body">
                <div class="members-title">
                    Membres attribués :
                </div>

                @if(!empty($attr['users']) && count($attr['users']) > 0)
                    <ul class="members-list">
                        @foreach($attr['users'] as $index => $user)
                            <li>
                                <span class="member-number">{{ $index + 1 }}.</span>
                                {{ $user['name'] ?? 'Nom non renseigné' }}
                            </li>
                        @endforeach
                    </ul>
                @else
                    <div class="empty">
                        Aucun membre attribué à ce logement.
                    </div>
                @endif
            </div>
        </div>
    @empty
        <div class="empty">
            Aucune attribution de logement trouvée.
        </div>
    @endforelse

    <div class="footer">
        SAVA-U — Rapport des attributions de logements
    </div>

</body>
</html>