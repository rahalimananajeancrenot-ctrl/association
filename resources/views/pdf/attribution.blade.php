<h2 class="text-center text-success">Attribution de logements</h2>

@foreach($attributions as $attr)
    <p>Logement : {{ $attr['logement_name'] }} — Attribué le {{ $attr['created_at'] ?? now()->format('d/m/Y') }}</p>
    <ul>
        @foreach($attr['users'] as $user)
            <li>{{ $user['name'] }}</li>
        @endforeach
    </ul>
@endforeach